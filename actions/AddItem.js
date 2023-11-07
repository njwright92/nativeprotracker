import { ADD_ITEM } from "./types";
import {
  onSnapshot,
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const addItem = (item) => {
  return async (dispatch) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const newItem = {
      name: item.name,
      uid: user.uid,
      timestamp: serverTimestamp(),
    };
    try {
      const docRef = await addDoc(collection(db, "items"), newItem);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const itemData = { ...docSnap.data(), id: docRef.id };
        dispatch({
          type: ADD_ITEM,
          payload: itemData,
        });
        window.alert("Success", "Item added successfully!");
        onSnapshot(
          collection(db, "items"),
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const newItemData = { ...change.doc.data(), id: change.doc.id };
                console.log("New item added: ", newItemData);
              }
            });
          },
          (error) => {
            console.log("Error getting items collection updates: ", error);
          }
        );
      }
    } catch (error) {
      window.alert("failed", "Item not added!");
    }
  };
};
