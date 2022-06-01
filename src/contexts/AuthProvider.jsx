import { useState } from "react";
import { createContext, useEffect, useReducer } from "react";

const AuthContext = createContext({});

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
