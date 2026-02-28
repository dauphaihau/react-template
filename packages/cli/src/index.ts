import { Command } from 'commander'
import { input, select, checkbox } from '@inquirer/prompts'
import ora from 'ora'
import chalk from 'chalk'
import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { scaffold } from './scaffold.js'
import { install } from './install.js'
import { log } from './logger.js'
import type { PackageManager, FeatureId, ScaffoldOptions } from './types.js'

const program = new Command()

program
  .name('create-react-template')
  .description('Scaffold a TanStack Start + React 19 + FSD app')
  .argument('[project-name]', 'Name of the new project')
  .option('--skip-install', 'Skip installing dependencies')
  .action(async (projectNameArg: string | undefined, opts: { skipInstall?: boolean }) => {
    console.log()
    console.log(chalk.bold('  create-react-template'))
    console.log()

    // --- Project name ---
    let projectName: string
    if (projectNameArg) {
      projectName = projectNameArg
    } else {
      projectName = await input({
        message: 'Project name',
        default: 'my-app',
        validate: (v: string) => {
          if (!v.trim()) return 'Project name is required'
          if (!/^[a-z0-9-]+$/.test(v.trim())) {
            return 'Use only lowercase letters, numbers, and hyphens'
          }
          return true
        },
      })
    }

    const projectDir = resolve(process.cwd(), projectName)

    if (existsSync(projectDir)) {
      log.error(`Directory "${projectName}" already exists`)
      process.exit(1)
    }

    // --- Package manager ---
    const packageManager = await select<PackageManager>({
      message: 'Package manager',
      choices: [
        { name: 'bun (recommended)', value: 'bun' },
        { name: 'npm', value: 'npm' },
        { name: 'pnpm', value: 'pnpm' },
      ],
    })

    // --- Optional features ---
    const features = await checkbox<FeatureId>({
      message: 'Select optional features',
      choices: [
        {
          name: 'Auth — AuthContext, useAuth hook, login/register routes',
          value: 'auth',
          checked: false,
        },
      ],
    })

    console.log()

    const opts2: ScaffoldOptions = {
      projectName,
      projectDir,
      packageManager,
      features,
    }

    // --- Scaffold ---
    const scaffoldSpinner = ora('Cloning template…').start()
    try {
      await scaffold(opts2)
      scaffoldSpinner.succeed('Template cloned')
    } catch (err) {
      scaffoldSpinner.fail('Failed to clone template')
      log.error(String(err))
      process.exit(1)
    }

    // --- Install ---
    if (!opts.skipInstall) {
      const installSpinner = ora(`Installing dependencies with ${packageManager}…`).start()
      try {
        await install(projectDir, packageManager)
        installSpinner.succeed('Dependencies installed')
      } catch {
        installSpinner.fail(`Install failed`)
        log.tip(`Run manually: cd ${projectName} && ${packageManager} install`)
      }
    }

    // --- Done ---
    console.log()
    log.success(chalk.bold(`Created ${chalk.cyan(projectName)}`))
    console.log()
    log.tip(`cd ${projectName}`)
    log.tip(`${packageManager} run dev`)
    console.log()
  })

program.parse()
