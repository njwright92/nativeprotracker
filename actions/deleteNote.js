import { DELETE_NOTE } from "./types";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const deleteNote = (itemId, noteId) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    await deleteDoc(doc(db, "items", itemId, "notes", noteId));
    dispatch({
      type: DELETE_NOTE,
      payload: { noteId, itemId, uid: user.uid },
    });
    window.alert("Success", "Note deleted successfully!");
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};
