import { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  //   Create User with EP
  const registerUser = (email, password) => {
    setLoadingUser(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Signout User
  const logout = () => {
    setLoadingUser(true);
    return signOut(auth);
  };

  //   Values of auth context
  const authInfo = {
    user,
    loadingUser,
    registerUser,
    logout,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
