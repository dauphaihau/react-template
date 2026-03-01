import { Command } from "commander";
import * as p from "@clack/prompts";
import ora from "ora";
import chalk from "chalk";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { scaffold } from "./scaffold.js";
import { gitInit, install } from "./install.js";
import { log } from "./logger.js";
import type { PackageManager, FeatureId, ScaffoldOptions } from "./types.js";

const program = new Command();

program
  .name("create-react-template")
  .description("Scaffold a TanStack Start + React 19 + FSD app")
  .argument("[project-name]", "Name of the new project")
  .option("--skip-install", "Skip installing dependencies")
  .action(
    async (
      projectNameArg: string | undefined,
      opts: { skipInstall?: boolean },
    ) => {
      p.intro(chalk.bold("create-react-template"));

      // --- Project name ---
      let projectName: string;
      if (projectNameArg) {
        projectName = projectNameArg;
      } else {
        const projectNameInput = await p.text({
          message: "Project name",
          defaultValue: "my-app",
          validate: (v) => {
            if (!v.trim()) return "Project name is required";
            if (!/^[a-z0-9-]+$/.test(v.trim())) {
              return "Use only lowercase letters, numbers, and hyphens";
            }
          },
        });

        if (p.isCancel(projectNameInput)) {
          p.cancel("Operation cancelled");
          process.exit(0);
        }

        projectName = projectNameInput as string;
      }

      const projectDir = resolve(process.cwd(), projectName);

      if (existsSync(projectDir)) {
        log.error(`Directory "${projectName}" already exists`);
        process.exit(1);
      }

      // --- Package manager ---
      const packageManager = (await p.select({
        message: "Package manager",
        options: [
          { label: "bun (recommended)", value: "bun" as PackageManager },
          { label: "npm", value: "npm" as PackageManager },
          { label: "pnpm", value: "pnpm" as PackageManager },
        ],
      })) as PackageManager;

      if (p.isCancel(packageManager)) {
        p.cancel("Operation cancelled");
        process.exit(0);
      }

      // --- Optional features ---
      const features = (await p.multiselect({
        message: "Select optional features",
        options: [
          {
            label: "Auth — AuthContext, useAuth hook, login/register routes",
            value: "auth" as FeatureId,
          },
        ],
        required: false,
      })) as FeatureId[];

      if (p.isCancel(features)) {
        p.cancel("Operation cancelled");
        process.exit(0);
      }

      console.log();

      const opts2: ScaffoldOptions = {
        projectName,
        projectDir,
        packageManager,
        features,
      };

      // --- Scaffold ---
      const scaffoldSpinner = ora("Cloning template…").start();
      try {
        await scaffold(opts2);
        scaffoldSpinner.succeed("Template cloned");
      } catch (err) {
        scaffoldSpinner.fail("Failed to clone template");
        log.error(String(err));
        process.exit(1);
      }

      // --- Git init (required before install so husky's prepare script works) ---
      await gitInit(projectDir);

      // --- Install ---
      if (!opts.skipInstall) {
        const installSpinner = ora(
          `Installing dependencies with ${packageManager}…`,
        ).start();
        try {
          await install(projectDir, packageManager);
          installSpinner.succeed("Dependencies installed");
        } catch {
          installSpinner.fail(`Install failed`);
          log.tip(
            `Run manually: cd ${projectName} && ${packageManager} install`,
          );
        }
      }

      // --- Done ---
      console.log();
      p.outro(chalk.bold(chalk.green(`✓ Created ${chalk.cyan(projectName)}`)));
      console.log();
      log.tip(`cd ${projectName}`);
      log.tip(`${packageManager} run dev`);
      console.log();
    },
  );

program.parse();
