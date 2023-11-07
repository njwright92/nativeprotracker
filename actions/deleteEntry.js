import { DELETE_ENTRY } from "./types";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const deleteEntry = (itemId, entryId) => {
  return async (dispatch) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const entryRef = doc(db, "items", itemId, "entries", entryId);
      await deleteDoc(entryRef);
      dispatch({
        type: DELETE_ENTRY,
        payload: {
          entryId,
          itemId,
          uid: user.uid,
        },
      });
      window.alert("Success", "Entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting entry: ", error);
    }
  };
};
