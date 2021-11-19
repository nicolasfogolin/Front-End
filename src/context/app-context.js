import { createContext, useContext, useMemo, useState, useEffect } from "react";

import { useDispatch } from 'react-redux'
import { signIn } from '../actions'

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [AppState, setAppState] = useState({});

  const dispatch = useDispatch();

  const contextValue = useMemo(() => {
    return [AppState, setAppState];
  }, [AppState, setAppState]);

  useEffect(() => {
    if (localStorage.getItem("X-Token")) { 
        
        dispatch(signIn(localStorage.getItem('X-Token'), ''));

    }
 }, []);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}