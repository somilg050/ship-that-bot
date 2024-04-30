import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "./firebase"; // adjust the path to where you export 'db'

type UserData = {
  email: string;
  count?: number;
  history?: string[];
};

export const setDocFirestore = async (userData: UserData) => {
  const userDocRef = doc(db, "users", userData.email);
  return await setDoc(userDocRef, { timeStamp: new Date(), ...userData });
};

export const getDocFirestore = async (referenceKey: string) => {
  const userDocRef = doc(db, "users", referenceKey);
  return getDoc(userDocRef);
};

export const updateDocFirestore = async (userData: UserData) => {
  const userDocRef = doc(db, "users", userData.email);
  return await updateDoc(userDocRef, userData);
};
