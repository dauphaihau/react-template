import fs from "fs-extra";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { deepMerge, featureDir } from "./utils.js";
import type { ScaffoldOptions, FeatureId, FeatureDeps } from "./types.js";

// Update this to your GitHub repo before publishing
const TEMPLATE_REPO = "dauphaihau/react-template";

export async function scaffold(opts: ScaffoldOptions): Promise<void> {
  const { projectName, projectDir, features } = opts;

  // Step 1: Clone full monorepo from GitHub via degit
  const degit = (await import("degit")).default;
  const emitter = degit(TEMPLATE_REPO, { cache: false, force: true });
  await emitter.clone(projectDir);

  // Flatten packages/template/ to project root (template source is now in packages/template/)
  const templatePkgDir = join(projectDir, "packages", "template");
  await fs.copy(templatePkgDir, projectDir, { overwrite: true });

  // Remove monorepo-only directories
  await fs.remove(join(projectDir, "packages"));
  await fs.remove(join(projectDir, "docs"));

  // Fix content-collections.ts path: packages/template/ uses ../../content/blog,
  // but in the scaffolded project content-collections.ts is at root alongside content/
  const ccPath = join(projectDir, "content-collections.ts");
  if (existsSync(ccPath)) {
    const cc = await fs.readFile(ccPath, "utf8");
    await fs.writeFile(
      ccPath,
      cc.replace("'../../content/blog'", "'content/blog'"),
    );
  }

  // Step 2: Apply each selected feature
  for (const featureId of features) {
    await applyFeature(featureId, projectDir);
  }

  // Step 3: Update package.json (name + merged feature deps)
  await patchPackageJson(projectName, projectDir, features);
}

async function applyFeature(
  featureId: FeatureId,
  projectDir: string,
): Promise<void> {
  const root = featureDir(featureId);

  // Copy new files
  const filesDir = join(root, "files");
  if (existsSync(filesDir)) {
    await fs.copy(filesDir, projectDir, { overwrite: true });
  }

  // Apply patches (full-file replacements)
  const patchesDir = join(root, "patches");
  if (existsSync(patchesDir)) {
    await applyPatches(patchesDir, patchesDir, projectDir);
  }
}

async function applyPatches(
  rootPatchesDir: string,
  currentDir: string,
  projectDir: string,
): Promise<void> {
  const entries = await readdir(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(currentDir, entry.name);
    if (entry.isDirectory()) {
      await applyPatches(rootPatchesDir, srcPath, projectDir);
    } else {
      const relativePath = srcPath.slice(rootPatchesDir.length + 1);
      const destPath = join(projectDir, relativePath);
      await fs.ensureDir(join(destPath, ".."));
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function patchPackageJson(
  projectName: string,
  projectDir: string,
  features: FeatureId[],
): Promise<void> {
  const pkgPath = join(projectDir, "package.json");
  const pkg = (await fs.readJson(pkgPath)) as Record<string, unknown>;

  pkg["name"] = projectName;

  // Remove workspaces field — only relevant to the monorepo root
  delete pkg["workspaces"];

  for (const featureId of features) {
    const depsPath = join(featureDir(featureId), "deps.json");
    if (existsSync(depsPath)) {
      const featureDeps = (await fs.readJson(depsPath)) as FeatureDeps;
      if (featureDeps.dependencies) {
        pkg["dependencies"] = deepMerge(
          (pkg["dependencies"] ?? {}) as Record<string, unknown>,
          featureDeps.dependencies as Record<string, unknown>,
        );
      }
      if (featureDeps.devDependencies) {
        pkg["devDependencies"] = deepMerge(
          (pkg["devDependencies"] ?? {}) as Record<string, unknown>,
          featureDeps.devDependencies as Record<string, unknown>,
        );
      }
    }
  }

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}
