import { createContext, useContext, useState } from "react";
import { Session } from "./api";

export type ISessionsContext = {
  session: Session;
  setSession: any;
};

export type IAppContext = {
  darkMode: boolean;
  setDarkMode: any;
};

const AppContexct = createContext<any>(undefined);

export const AppProvider: React.FC = ({ children }) => {
  const [session, setAppSession] = useState<Session>();
  const [darkMode, setAppMode] = useState<boolean>();

  const setDarkMode = (darkMode: boolean) => {
    return new Promise((resolve) => {
      setAppMode(darkMode);
      setTimeout(() => {
        return resolve(true);
      }, 1000);
    });
  }

  const setSession = (session: Session) => {
    return new Promise((resolve) => {
      let v = session;
      setAppSession(v);
      setTimeout(() => {
        return resolve(true);
      }, 1000);
    });
  };

  let v = {
    darkMode,
    setDarkMode: setDarkMode,
    session,
    setSession: setSession,
  };

  return <AppContexct.Provider value={v}>{children}</AppContexct.Provider>;
};

export const useSessions = () => useContext(AppContexct) as ISessionsContext;
export const useDarkMode = () => useContext(AppContexct) as IAppContext;
