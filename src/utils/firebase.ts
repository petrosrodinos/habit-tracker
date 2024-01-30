import { firebaseConfig } from "./../constants/firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const analytics = getAnalytics(app);
