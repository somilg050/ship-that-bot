import { db } from './firebase'; // adjust the path to where you export 'db'
import { doc, getDoc, setDoc } from 'firebase/firestore';

type UserData = {
    email: string,
    count: number,
};

export const setDocFirestore = async (userData: UserData) => {
    const userDocRef = doc(db, "users", userData.email);
    return await setDoc(userDocRef, {timeStamp: new Date(), ...userData});
}

export const getDocFirestore = async (referenceKey: string) => {
    const userDocRef = doc(db, 'users', referenceKey);
    return getDoc(userDocRef);
}
