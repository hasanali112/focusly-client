import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/baseApi";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../redux/features/auth/authSlice";
import pomodaroReducer from "./features/pomodaro/pomodaroSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const pomodaroPersistConfig = {
  key: "pomodaro",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedPomodaroReducer = persistReducer(
  pomodaroPersistConfig,
  pomodaroReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    pomodaro: persistedPomodaroReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
