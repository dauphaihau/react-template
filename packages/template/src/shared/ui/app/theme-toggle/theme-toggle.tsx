import { Moon, Sun } from 'lucide-react';
import { useTheme } from '#/shared/client-state/theme';

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  const label = `Theme mode: ${mode}. Click to switch to ${mode === 'light' ? 'dark' : 'light'} mode.`;
  const Icon = mode === 'dark' ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className="rounded-full border-0 bg-transparent p-2 text-foreground shadow-none transition"
    >
      <Icon className="size-4" />
    </button>
  );
}
