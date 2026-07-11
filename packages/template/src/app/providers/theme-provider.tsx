import {
  useCallback, useEffect, useMemo, useState, type ReactNode, 
} from 'react';
import { ThemeContext, type ThemeMode } from '#/shared/client-state/theme';

const STORAGE_KEY = 'theme';

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeMode(mode: ThemeMode) {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(mode);
  document.documentElement.setAttribute('data-theme', mode);
  document.documentElement.style.colorScheme = mode;
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    applyThemeMode(mode);
  }, [mode]);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      if (event.newValue === 'light' || event.newValue === 'dark') {
        setModeState(event.newValue);
      }
    }

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);
    window.localStorage.setItem(STORAGE_KEY, nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((currentMode) => {
      const nextMode: ThemeMode = currentMode === 'light' ? 'dark' : 'light';
      window.localStorage.setItem(STORAGE_KEY, nextMode);

      return nextMode;
    });
  }, []);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
