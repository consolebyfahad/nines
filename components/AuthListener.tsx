import { auth } from "@/config/firebase.config";
import { setUser } from "@/redux/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return null; // This component doesn't render anything
};
