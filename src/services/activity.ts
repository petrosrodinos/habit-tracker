import { Activity } from "../interfaces/activity";
import { db } from "../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const setActivities = async ({
  userId,
  activities,
}: {
  userId: string;
  activities: Activity[];
}): Promise<any> => {
  try {
    const tagsRef = doc(db, "users", userId);
    await updateDoc(tagsRef, { activities });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
