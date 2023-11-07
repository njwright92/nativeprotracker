import { UPDATE_ITEM } from "./types";
import { updateDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const updateItem = (item) => {
  return async (dispatch) => {
    try {
      const itemRef = doc(db, "items", item.id);
      const docSnap = await getDoc(itemRef);
      if (!docSnap.exists()) {
        console.error("Item does not exist");
        return;
      }
      await updateDoc(itemRef, {
        name: item.name,
      });

      const updatedItem = docSnap.data();
      dispatch({
        type: UPDATE_ITEM,
        payload: updatedItem,
      });
      window.alert("Success", "Item edited successfully!");
      onSnapshot(itemRef, (doc) => {
        const updatedItem = doc.data();
        dispatch({
          type: UPDATE_ITEM,
          payload: updatedItem,
        });
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
};
