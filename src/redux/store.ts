import { configureStore } from "@reduxjs/toolkit";
import getNowReducer from "./getNowSlice";
// redux persist to implement browser site or memory in tour application
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  WebStorage,
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

export function createPersistStore(): WebStorage {
  const isServer = typeof window === "undefined";

  // we will return our dummy server : we are creating a dummy server because we cant directly inject redux persist in Nexjs 14 upward or so
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage("local");
}

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStore;

const persistConfig: any = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, getNowReducer);

export const store = configureStore({
  reducer: {
    // getNow: getNowReducer,
    getNow: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
