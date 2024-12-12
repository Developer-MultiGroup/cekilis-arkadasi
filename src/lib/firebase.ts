import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzWq8ygjdXwmGa8APFHpxwj6Jpnk42N5Y",
  authDomain: "cekilis-arkadasi.firebaseapp.com",
  projectId: "cekilis-arkadasi",
  storageBucket: "cekilis-arkadasi.firebasestorage.app",
  messagingSenderId: "232932786501",
  appId: "1:232932786501:web:6e4c3d188cd056812a3e2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

const db = getFirestore(app);

/**
 * Creates a user document in Firestore
 * @param uid - User ID
 * @param name - User's name
 * @param surname - User's surname
 */
export const createUserDocument = async (uid: string, name: string, surname: string) => {
  const fullName = `${name.toLowerCase()}_${surname.toLowerCase()}`;
  const userRef = doc(db, "users", fullName);
  await setDoc(userRef, {
    name,
    surname,
    photo_url: "",
    matched_to: "",
    points: 0,
  });
};
