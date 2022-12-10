import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3GBUEVXrcjRVVkWH_K_MHqIX_8B6F6m0",
  authDomain: "waste-not-a9e9c.firebaseapp.com",
  databaseURL: "https://waste-not-a9e9c.firebaseio.com",
  projectId: "waste-not-a9e9c",
  storageBucket: "waste-not-a9e9c.appspot.com",
  messagingSenderId: "29158293636",
  appId: "1:29158293636:web:3643b51a83c8d6c0d842d1",
  measurementId: "G-0FVNQPCSZP"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};


export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName } = user;
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);