import { auth } from "@/config/firebase.config";
import { setUser } from "@/redux/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
