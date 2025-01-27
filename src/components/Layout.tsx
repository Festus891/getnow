"use client";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";

// we created this layour because we can directly inject redux provider in our aplication so instead we create a layout where we wrap the children withe provider and wrapped the layout with our application
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider> {children}</SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default Layout;
