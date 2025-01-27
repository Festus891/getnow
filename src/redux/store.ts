import { configureStore } from "@reduxjs/toolkit";
import getNowReducer from "./getNowSlice";
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

// ✅ Importing correct built-in storage
import storage from "redux-persist/lib/storage";

export function createPersistStore(): WebStorage {
  if (typeof window === "undefined") {
    return {
      getItem: async () => null,
      setItem: async () => {},
      removeItem: async () => {},
    };
  }
  return storage;
}

const persistConfig: any = {
  key: "root",
  version: 1,
  storage, // ✅ Using correct storage here
};

const persistedReducer = persistReducer(persistConfig, getNowReducer);

export const store = configureStore({
  reducer: {
    getNow: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
