import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Resolves to the root of the CLI package (packages/cli/)
export const PKG_ROOT = join(fileURLToPath(import.meta.url), '..', '..')

export function featureDir(featureId: string): string {
  return join(PKG_ROOT, '..', 'features', featureId)
}

export function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T>
): T {
  const result = { ...base }
  for (const key in override) {
    const baseVal = result[key]
    const overrideVal = override[key]
    if (
      baseVal !== null &&
      overrideVal !== null &&
      typeof baseVal === 'object' &&
      typeof overrideVal === 'object' &&
      !Array.isArray(baseVal) &&
      !Array.isArray(overrideVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>
      ) as T[typeof key]
    } else {
      result[key] = overrideVal as T[typeof key]
    }
  }
  return result
}
