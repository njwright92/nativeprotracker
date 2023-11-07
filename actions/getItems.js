import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const getAllItemsByCurrentUser = async () => {
  try {
    const currentUser = getAuth().currentUser;
    const q = query(
      collection(db, "items"),
      where("uid", "==", currentUser.uid),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};
