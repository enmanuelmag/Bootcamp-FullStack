import { create } from 'zustand';

import {
  UserState,
  StoreActions,
  INITIAL_STATE as INITIAL_USER,
} from '@store/slides/user';
import {
  ThemeStore,
  StoreActions as ThemeActions,
  INITIAL_STATE as INITIAL_THEME,
} from '@store/slides/theme';

const useStore = create<StoreActions & ThemeActions & UserState & ThemeStore>(
  (set) => ({
    ...INITIAL_USER,
    ...INITIAL_THEME,
    //actions user
    clear: () => set(INITIAL_USER),
    setUser: (user) => set(user),
    setField: (field, value) => set((state) => ({ ...state, [field]: value })),
    //actions theme
    toggleTheme: () =>
      set((state) => ({ schema: state.schema === 'light' ? 'dark' : 'light' })),
    setTheme: (schema) => set({ schema }),
  })
);

export default useStore;
