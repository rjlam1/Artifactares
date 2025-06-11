import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { Children, createContext, useEffect } from "react";
import { auth } from "../../Firebase/Firebase";
import { useState } from "react";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user,setUser]=useState(null)

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    });
    return () => unsubscribe;
  }, []);

   const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const signout=()=>{
    return signOut(auth)
  }


  const userInfo = {
    createUser,
    signin,
    googleSignin,
    user,
     updateUserProfile,
    signout
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
