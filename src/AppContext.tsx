import { createContext, useContext, useState } from 'react'
import { useMedia } from 'react-use'
import { Session } from './api'

export type ISessionsContext = {
  session: Session
  setSession: any
}

export type IAppContext = {
  darkMode: boolean
  setDarkMode: any
}

export type IAuthContext = {
  loggedIn: boolean
  authState: {
    clientId: string
    redirectUri: string
    clientSecret: string
  }
}

const AppContexct = createContext<any>(undefined)

export const AppProvider: React.FC = ({ children }) => {
  const prefersDark = useMedia('(prefers-color-scheme: dark)')

  const [session, setAppSession] = useState<Session>()
  const [darkMode, setAppMode] = useState<boolean>(prefersDark)
  const [loggedIn, setLogin] = useState<boolean>(false)
  const [clientId] = useState<string | undefined>(process.env.REACT_APP_CLIENT_ID)
  const [redirectUri] = useState<string | undefined>(process.env.REACT_APP_REDIRECT_URI)
  const [clientSecret] = useState<string | undefined>(process.env.REACT_APP_CLIENT_SECRET)

  const setDarkMode = (darkMode: boolean) => {
    return new Promise((resolve) => {
      setAppMode(darkMode)
      setTimeout(() => {
        return resolve(true)
      }, 1000)
    })
  }

  const setSession = (session: Session) => {
    return new Promise((resolve) => {
      let v = session
      setAppSession(v)
      setTimeout(() => {
        return resolve(true)
      }, 1000)
    })
  }

  let v = {
    darkMode,
    loggedIn,
    authState: {
      clientId,
      redirectUri,
      clientSecret
    },
    setDarkMode: setDarkMode,
    session,
    setSession: setSession
  }

  return <AppContexct.Provider value={v}>{children}</AppContexct.Provider>
}

export const useSessions = () => useContext(AppContexct) as ISessionsContext
export const useDarkMode = () => useContext(AppContexct) as IAppContext
export const useAuth = () => useContext(AppContexct) as IAuthContext
