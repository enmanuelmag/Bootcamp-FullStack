export type ThemeStore = {
  schema: 'light' | 'dark';
};

export type StoreActions = {
  toggleTheme: () => void;
  setTheme: (schema: ThemeStore['schema']) => void;
};

export const INITIAL_STATE: ThemeStore = {
  schema: 'light',
};
