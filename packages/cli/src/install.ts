import { execa } from 'execa'
import type { PackageManager } from './types.js'

const INSTALL_COMMANDS: Record<PackageManager, [string, string[]]> = {
  bun: ['bun', ['install']],
  npm: ['npm', ['install']],
  pnpm: ['pnpm', ['install']],
}

export async function install(
  projectDir: string,
  packageManager: PackageManager
): Promise<void> {
  const [cmd, args] = INSTALL_COMMANDS[packageManager]
  await execa(cmd, args, {
    cwd: projectDir,
    stdio: 'inherit',
  })
}
