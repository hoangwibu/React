import { createContext, useEffect, useState } from "react";
import { MyContextValue, userInfoType } from "../models/ContextType";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthContext = createContext<MyContextValue | null>(null);
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<userInfoType>();
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setUserInfo(user as userInfoType);
    });
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider, AuthContext };