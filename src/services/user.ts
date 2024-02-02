import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export const addNewUser = async (user: any): Promise<any | null> => {
  try {
    const userToStore: any = {
      userId: user.uid,
      avatar: user.photoURL,
      activities: [],
    };
    if (isNewUser(user.metadata.creationTime)) {
      await setDoc(doc(db, "users", user.uid), userToStore);
      return {
        ...userToStore,
        token: user.accessToken,
        exp: user.stsTokenManager.expirationTime,
      };
    } else {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          ...docSnap.data(),
          token: user.accessToken,
          exp: user.stsTokenManager.expirationTime,
        };
      }
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};

const isNewUser = (creationTime: string) => {
  if (new Date().getTime() - new Date(creationTime).getTime() < 5000) {
    return true;
  }
  return false;
};
