export type PackageManager = 'bun' | 'npm' | 'pnpm'

export type FeatureId = 'auth' | 'github-actions' | 'zustand'

export interface ScaffoldOptions {
  projectName: string
  projectDir: string
  packageManager: PackageManager
  features: FeatureId[]
}

export interface FeatureDeps {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}
