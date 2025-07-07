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
import targetReducer from "./features/target/targetSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const pomodaroPersistConfig = {
  key: "pomodaro",
  storage,
};

const targetPersistConfig = {
  key: "target",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedPomodaroReducer = persistReducer(
  pomodaroPersistConfig,
  pomodaroReducer
);

const persistedTarget = persistReducer(targetPersistConfig, targetReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    pomodaro: persistedPomodaroReducer,
    target: persistedTarget,
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
