import React, { createContext, useState, ReactNode, useContext } from 'react';

export interface AuthContextType {
  auth: string | null;
  setAuth: (auth: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<string | null>(localStorage.getItem('authUser'));

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be within Auth Provider")
  }

  return auth;
}