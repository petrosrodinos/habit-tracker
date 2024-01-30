import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export const addNewUser = async (user: any): Promise<any | null> => {
  try {
    let userToStore: any = {
      userId: user.uid,
      avatar: user.photoURL,
      activities: [],
    };
    if (isNewUser(user.metadata.creationTime)) {
      await setDoc(doc(db, "users", user.uid), userToStore);
    } else {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
      }
    }

    return userToStore;
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
