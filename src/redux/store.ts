import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import { taskApi } from './api/tasksApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    counterReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([taskApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Inferir el tipo de makeStore
//export type AppStore = ReturnType<typeof makeStore>
// Inferir los tipos `RootState` y `AppDispatch` desde el store mismo
//export type RootState = ReturnType<AppStore['getState']>
//export type AppDispatch = AppStore['dispatch']
