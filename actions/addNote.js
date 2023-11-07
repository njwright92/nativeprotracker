import { ADD_NOTE } from "./types";
import { onSnapshot, addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export const addNote = (itemId, note) => {
  return async (dispatch) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const newNote = {
        itemId,
        note,
        uid: user.uid,
      };
      const docRef = await addDoc(
        collection(db, "items", itemId, "notes"),
        newNote
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const noteData = { ...docSnap.data(), id: docRef.id };
        dispatch({
          type: ADD_NOTE,
          payload: noteData,
        });
        window.alert("Success", "Note added successfully!");
        onSnapshot(
          collection(db, "items", itemId, "notes"),
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                // You can add any necessary code here if you want to handle real-time updates for notes
                // For example, dispatching another action to handle the real-time update.
              }
            });
          },
          (error) => {
            console.log("Error getting notes collection updates: ", error);
          }
        );
      }
    } catch (error) {
      window.alert("failed", "Note not added!");
    }
  };
};
