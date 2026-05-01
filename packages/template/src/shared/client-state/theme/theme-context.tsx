import { createContext, useContext, type ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

export type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const themeContext = createContext<ThemeContextValue | null>(null);

type ThemeContextProviderProps = {
  children: ReactNode;
  value: ThemeContextValue;
};

export function ThemeContextProvider({ children, value }: ThemeContextProviderProps) {
  return <themeContext.Provider value={value}>{children}</themeContext.Provider>;
}

export function useTheme() {
  const context = useContext(themeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
