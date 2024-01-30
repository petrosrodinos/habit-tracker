import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../utils/firebase";
import { addNewUser } from "./user";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("User is not logged in");
    return undefined;
  }

  addNewUser(user);
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
