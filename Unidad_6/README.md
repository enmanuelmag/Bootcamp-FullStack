# Unidad 6 - Global State

## ¿Qué es un estado global?

El global state es un concepto ampliamente aplicado en diversas aplicaciones, ya sea web, nativas, incluso en ciertos servidores. En ReactJS, el estado global nos permite almacenar cualquier tipo dato, ya sea primitivo, JSON, Clase etc. Además, en ReactJS se acostumbra a definir además de los valores, también las funciones que realizan las modificaciones, del estado.

## ¿Por qué usar un estado global?

Los componentes pueden compartir valores entre sí con la ayuda de props. Sin embargo, el problema está cuando deseamos compartir valores o funciones, entre componentes hermanos, o que el flujo va de un componente hijo a un padre. Incluso si fuera de un componente padre a un “nieto” eso involucra que se necesita enviar valores a un componente intermedio. Que probablemente no necesite esos valores, pero los recibe solo a manera de “Componente tránsito”, lo que provoca que el componente tenga mas código del que debería.

## ¿Qué opciones hay para crearlo?

- React Context.
- Redux (Sagas o Thunks)
- Zustand

## Definición de implementación

A continuación, usaremos el global State para mocker los datos de un usuario logeado que puede tener el rol de “admin” y “user”.
- Admin, puede entrar a todas las secciones y crear nuevos usuarios.
- User, no puede crear nuevos usuarios solo listar usuarios o alguno con su URL directo.

## Implementación React Context

Estructura de carpetas:
```
src/
  ...
  types/
    ...
    context.ts
  context/
    index.ts
  ...
```

1. Crear el archivo `context.ts` en la carpeta `types`, este archivo definirá la estructura de los datos que se almacenarán en el estado global.
```typescript
import z from 'zod';

export const UserLoginSchema = z.object({
  name: z.string(),
  city: z.string(),
  email: z.string(),
  role: z.enum(['admin', 'user']),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;
```
2. Crear el archivo `index.ts` en la carpeta `context`, este archivo definirá el contexto y el proveedor del estado global.
```typescript
import React from 'react';
import { UserLogin } from '@customTypes/context';

export const INITIAL_USER_LOGIN: UserLogin = {
  name: 'Enmanuel',
  city: 'Manta',
  email: 'enmanuelmag@cardor.dev',
  role: 'user',
};

const MyContext = React.createContext<UserLogin>(INITIAL_USER_LOGIN);

export default MyContext;
```
3. Envolver a nuestra app con el proveedor del contexto en el archivo `main.tsx`.
4. En el componente Layout, crear la lógica para validar que el usuario tiene permiso para ingresar a los paths de la aplicación.
5. En el componente `home`, ocultar las secciones según el rol del usuario.

## Implementación Zustand

Primero se debe instalar las dependencias necesarias:
```bash
npm install zustand
```

La implementación de Zustand es mucho las sencilla que Redux y Context, ya que solo se necesita crear el store (con sus acciones y reducers) y para acceder a los valores del store se puede usar el hook que devuelve la función `create` de Zustand, no es necesario envolver a la app con un proveedor de contexto.

Estructura de carpetas:
```
src/
  ...
  store/
    index.ts
  ...
```

1. Crear el archivo `index.ts` en la carpeta `store`, este archivo definirá el store de Zustand.
2. Crear la carpeta `slice` en la carpeta `store`. Y dentro crear el archivo `user.ts` y `theme.ts`.
3. Dentro de cada slice definiremos el `type` de campos y acciones de cada slice.

Slice de `user.ts`:
```typescript
import { UserLogin } from '@customTypes/context';

export type UserState = {
  name: string;
  city: string;
  email: string;
  role: string;
};

export type StoreActions = {
  clear: () => void;
  setUser: (user: UserLogin) => void;
  setField: (field: keyof UserLogin, value: string) => void;
};

export const INITIAL_STATE: UserState = {
  name: '',
  city: '',
  email: '',
  role: '',
};
```

Slice de `theme.ts`:
```typescript
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
```

4. Ahora solo queda crear el store de Zustand en el archivo `index.ts` de la carpeta `store` con el contenido de los slice y definir las funciones que modificarán el estado global.
```typescript
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

```
5. Actualizar la app para usar el hook personalizado `useStore` en lugar de `useDispatch` (devuelve la función dispatch para actualizar) y `useSelector` (devuelve el valor según el selector que se le pase). Recordemos que ahora podemos acceder a los valores y funciones del store de manera directa.


## Implementación Redux

Primero se debe instalar las dependencias necesarias:
```bash
npm install @reduxjs/toolkit Redux react-redux
```

Estructura de carpetas:
```
src/
  ...
  types/
    ...
    store.ts
  store/
    index.ts
    slice/
      theme.ts
      user.ts 
  ...
```

1. Crear el archivo `store.ts` en la carpeta `types`, este archivo definirá la estructura de los datos que se almacenarán en el estado global.
```typescript
import z from 'zod';

export const UserLoginSchema = z.object({
  name: z.string(),
  city: z.string(),
  email: z.string(),
  role: z.enum(['admin', 'user']),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;

export const ThemeSchema = z.object({
  schema: z.enum(['light', 'dark']),
});

export type Theme = z.infer<typeof ThemeSchema>;
```
2. Crear el slide para `theme.ts` en la carpeta `slice`, este archivo definirá las acciones y reducers para el tema de la aplicación.
```typescript
import type { RootState } from '@store/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Theme } from '@customTypes/store';

const initialState: Theme = {
  schema: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme['schema']>) => {
      state.schema = action.payload;
    },
    toggleTheme: (state) => {
      state.schema = state.schema === 'light' ? 'dark' : 'light';
    },
  },
});

export const themeAction = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.schema;

export default themeSlice.reducer;
```
3. Crear el slide para `user.ts` en la carpeta `slice`, este archivo definirá las acciones y reducers para el usuario logeado.
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@store/index';

import { UserLogin } from '@customTypes/store';

const initialState: UserLogin = {
  role: 'admin',
  city: 'Manta',
  name: 'Enmanuel Magallanes',
  email: 'enmanuelmag@cardor.dev',
};

export const userLoginSlice = createSlice({
  name: 'user-login',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserLogin['role']>) => {
      state.role = action.payload;
    },
    setName: (state, action: PayloadAction<UserLogin['name']>) => {
      state.name = action.payload;
    },
    setCity: (state, action: PayloadAction<UserLogin['city']>) => {
      state.city = action.payload;
    },
  },
});

export const userLoginAction = userLoginSlice.actions;

export const selectUserRole = (state: RootState) => state.userLogin.role;

export const selectUserName = (state: RootState) => state.userLogin.name;

export const selectUserCity = (state: RootState) => state.userLogin.city;

export const selectUser = (state: RootState) => state.userLogin;

export default userLoginSlice.reducer;
```
4. Crear el archivo `index.ts` en la carpeta `store`, este archivo definirá el store de Redux.
```typescript
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import UserSlice from '@store/slice/user';

import ThemeSlice from '@store/slice/theme';

const rootReducer = combineReducers({
  userLogin: UserSlice,
  theme: ThemeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
```

5. Envolver a nuestra app con el proveedor del store en el archivo `main.tsx`.
6. Para facilitar el acceso a la funciones que modifican el estado global, se puede crear un hook personalizado. En el archivo `hooks/store.ts`.
```typescript
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@store/index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();
```
7. Actualizar la app para usar el hook personalizado en lugar de `useDispatch` (devuelve la función dispatch para actualizar) y `useSelector` (devuelve el valor según el selector que se le pase).
8. En el componente Layout, crear la lógica para validar que el usuario tiene permiso para ingresar a los paths de la aplicación.
