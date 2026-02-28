import chalk from 'chalk'

export const log = {
  info: (msg: string) => console.log(chalk.cyan('ℹ'), msg),
  success: (msg: string) => console.log(chalk.green('✓'), msg),
  error: (msg: string) => console.error(chalk.red('✗'), msg),
  tip: (msg: string) => console.log(chalk.yellow('→'), msg),
  blank: () => console.log(),
}
