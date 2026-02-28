#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";
import { input, select, checkbox } from "@inquirer/prompts";
import ora from "ora";
import chalk2 from "chalk";
import { resolve } from "path";
import { existsSync as existsSync2 } from "fs";

// src/scaffold.ts
import fs from "fs-extra";
import { join as join2 } from "path";
import { existsSync } from "fs";
import { readdir } from "fs/promises";

// src/utils.ts
import { join } from "path";
import { fileURLToPath } from "url";
var PKG_ROOT = join(fileURLToPath(import.meta.url), "..", "..");
function featureDir(featureId) {
  return join(PKG_ROOT, "..", "features", featureId);
}
function deepMerge(base, override) {
  const result = { ...base };
  for (const key in override) {
    const baseVal = result[key];
    const overrideVal = override[key];
    if (baseVal !== null && overrideVal !== null && typeof baseVal === "object" && typeof overrideVal === "object" && !Array.isArray(baseVal) && !Array.isArray(overrideVal)) {
      result[key] = deepMerge(
        baseVal,
        overrideVal
      );
    } else {
      result[key] = overrideVal;
    }
  }
  return result;
}

// src/scaffold.ts
var TEMPLATE_REPO = "dauphaihau/react-template";
async function scaffold(opts) {
  const { projectName, projectDir, features } = opts;
  const degit = (await import("degit")).default;
  const emitter = degit(TEMPLATE_REPO, { cache: false, force: true });
  await emitter.clone(projectDir);
  const templatePkgDir = join2(projectDir, "packages", "template");
  await fs.copy(templatePkgDir, projectDir, { overwrite: true });
  await fs.remove(join2(projectDir, "packages"));
  await fs.remove(join2(projectDir, "docs"));
  const ccPath = join2(projectDir, "content-collections.ts");
  if (existsSync(ccPath)) {
    const cc = await fs.readFile(ccPath, "utf8");
    await fs.writeFile(
      ccPath,
      cc.replace("'../../content/blog'", "'content/blog'")
    );
  }
  for (const featureId of features) {
    await applyFeature(featureId, projectDir);
  }
  await patchPackageJson(projectName, projectDir, features);
}
async function applyFeature(featureId, projectDir) {
  const root = featureDir(featureId);
  const filesDir = join2(root, "files");
  if (existsSync(filesDir)) {
    await fs.copy(filesDir, projectDir, { overwrite: true });
  }
  const patchesDir = join2(root, "patches");
  if (existsSync(patchesDir)) {
    await applyPatches(patchesDir, patchesDir, projectDir);
  }
}
async function applyPatches(rootPatchesDir, currentDir, projectDir) {
  const entries = await readdir(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join2(currentDir, entry.name);
    if (entry.isDirectory()) {
      await applyPatches(rootPatchesDir, srcPath, projectDir);
    } else {
      const relativePath = srcPath.slice(rootPatchesDir.length + 1);
      const destPath = join2(projectDir, relativePath);
      await fs.ensureDir(join2(destPath, ".."));
      await fs.copyFile(srcPath, destPath);
    }
  }
}
async function patchPackageJson(projectName, projectDir, features) {
  const pkgPath = join2(projectDir, "package.json");
  const pkg = await fs.readJson(pkgPath);
  pkg["name"] = projectName;
  delete pkg["workspaces"];
  for (const featureId of features) {
    const depsPath = join2(featureDir(featureId), "deps.json");
    if (existsSync(depsPath)) {
      const featureDeps = await fs.readJson(depsPath);
      if (featureDeps.dependencies) {
        pkg["dependencies"] = deepMerge(
          pkg["dependencies"] ?? {},
          featureDeps.dependencies
        );
      }
      if (featureDeps.devDependencies) {
        pkg["devDependencies"] = deepMerge(
          pkg["devDependencies"] ?? {},
          featureDeps.devDependencies
        );
      }
    }
  }
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}

// src/install.ts
import { execa } from "execa";
var INSTALL_COMMANDS = {
  bun: ["bun", ["install"]],
  npm: ["npm", ["install"]],
  pnpm: ["pnpm", ["install"]]
};
async function install(projectDir, packageManager) {
  const [cmd, args] = INSTALL_COMMANDS[packageManager];
  await execa(cmd, args, {
    cwd: projectDir,
    stdio: "inherit"
  });
}

// src/logger.ts
import chalk from "chalk";
var log = {
  info: (msg) => console.log(chalk.cyan("\u2139"), msg),
  success: (msg) => console.log(chalk.green("\u2713"), msg),
  error: (msg) => console.error(chalk.red("\u2717"), msg),
  tip: (msg) => console.log(chalk.yellow("\u2192"), msg),
  blank: () => console.log()
};

// src/index.ts
var program = new Command();
program.name("create-react-template").description("Scaffold a TanStack Start + React 19 + FSD app").argument("[project-name]", "Name of the new project").option("--skip-install", "Skip installing dependencies").action(async (projectNameArg, opts) => {
  console.log();
  console.log(chalk2.bold("  create-react-template"));
  console.log();
  let projectName;
  if (projectNameArg) {
    projectName = projectNameArg;
  } else {
    projectName = await input({
      message: "Project name",
      default: "my-app",
      validate: (v) => {
        if (!v.trim()) return "Project name is required";
        if (!/^[a-z0-9-]+$/.test(v.trim())) {
          return "Use only lowercase letters, numbers, and hyphens";
        }
        return true;
      }
    });
  }
  const projectDir = resolve(process.cwd(), projectName);
  if (existsSync2(projectDir)) {
    log.error(`Directory "${projectName}" already exists`);
    process.exit(1);
  }
  const packageManager = await select({
    message: "Package manager",
    choices: [
      { name: "bun (recommended)", value: "bun" },
      { name: "npm", value: "npm" },
      { name: "pnpm", value: "pnpm" }
    ]
  });
  const features = await checkbox({
    message: "Select optional features",
    choices: [
      {
        name: "Auth \u2014 AuthContext, useAuth hook, login/register routes",
        value: "auth",
        checked: false
      }
    ]
  });
  console.log();
  const opts2 = {
    projectName,
    projectDir,
    packageManager,
    features
  };
  const scaffoldSpinner = ora("Cloning template\u2026").start();
  try {
    await scaffold(opts2);
    scaffoldSpinner.succeed("Template cloned");
  } catch (err) {
    scaffoldSpinner.fail("Failed to clone template");
    log.error(String(err));
    process.exit(1);
  }
  if (!opts.skipInstall) {
    const installSpinner = ora(`Installing dependencies with ${packageManager}\u2026`).start();
    try {
      await install(projectDir, packageManager);
      installSpinner.succeed("Dependencies installed");
    } catch {
      installSpinner.fail(`Install failed`);
      log.tip(`Run manually: cd ${projectName} && ${packageManager} install`);
    }
  }
  console.log();
  log.success(chalk2.bold(`Created ${chalk2.cyan(projectName)}`));
  console.log();
  log.tip(`cd ${projectName}`);
  log.tip(`${packageManager} run dev`);
  console.log();
});
program.parse();
