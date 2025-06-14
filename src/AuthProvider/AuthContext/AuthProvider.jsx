// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import React, { Children, createContext, useEffect } from "react";
// import { auth } from "../../Firebase/Firebase";
// import { useState } from "react";
// export const AuthContext = createContext(null);
// const AuthProvider = ({ children }) => {
//   const provider = new GoogleAuthProvider();
//   const [user,setUser]=useState(null)

//   const createUser = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };
//   const signin = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };
//   const googleSignin = () => {
//     return signInWithPopup(auth, provider);
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//         setUser(currentUser)
//     });
//     return () => unsubscribe;
//   }, []);

//    const updateUserProfile = (profile) => {
//     return updateProfile(auth.currentUser, profile);
//   };

//   const signout=()=>{
//     return signOut(auth)
//   }


//   const userInfo = {
//     createUser,
//     signin,
//     googleSignin,
//     user,
//      updateUserProfile,
//     signout
//   };
//   return <AuthContext value={userInfo}>{children}</AuthContext>;
// };

// export default AuthProvider;


import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/Firebase";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Generate JWT token after creation
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Generate JWT token after login
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const googleSignin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      // Generate JWT token after Google login
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Refresh token on auth state change
        const token = await currentUser.getIdToken();
        localStorage.setItem('token', token);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    createUser,
    signin,
    googleSignin,
    user,
    updateUserProfile,
    signout,
    loading
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;