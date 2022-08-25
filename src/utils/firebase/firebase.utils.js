
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup , 
    GoogleAuthProvider,
    createUserWithEmailAndPassword 
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfonPPaawBOBatHweyXL9I70daQWhCoFA",
  authDomain: "crwn-clothing-db-e9adc.firebaseapp.com",
  projectId: "crwn-clothing-db-e9adc",
  storageBucket: "crwn-clothing-db-e9adc.appspot.com",
  messagingSenderId: "464490287925",
  appId: "1:464490287925:web:3ce62d6840018b5e7cb27c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect( auth , googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
       const { displayName, email } = userAuth;
       const createdAt = new Date();

       try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
        });
       } catch (error) {
        console.log('error creating the user ', error.message);
       }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}