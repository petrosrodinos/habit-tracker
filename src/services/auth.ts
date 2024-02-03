import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../utils/firebase";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    return undefined;
  }
  return undefined;
});

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const signInWithGoogle = (): Promise<any> => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithFacebook = (): Promise<any> => {
  return signInWithPopup(auth, facebookProvider);
};

export const getLoggedUser = () => {
  return auth.currentUser;
};

export const logoutUser = () => {
  auth.signOut().then(() => {});
};
