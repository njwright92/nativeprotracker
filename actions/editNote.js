import { EDIT_NOTE } from './types';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { db } from '../firebaseConfig';

export const editNote = (itemId, noteId, newNoteContent) => {
  return async (dispatch) => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      const noteRef = doc(db, 'items', itemId, 'notes', noteId);
      const noteDoc = await getDoc(noteRef);
      console.log('Fetched note data:', noteDoc.data());

      await setDoc(noteRef, {
        ...noteDoc.data(),
        note: newNoteContent.note || ''
      });

      dispatch({
        type: EDIT_NOTE,
        payload: {
          itemId,
          noteId,
          note: newNoteContent.note,
          uid: user.uid
        },
      });

      onSnapshot(noteRef, (doc) => {
        const updatedNote = { ...doc.data(), id: doc.id };
        console.log('editNote snapshot', updatedNote);
      });

    } catch (error) {
      console.error('Error updating document: ', error);
      console.error('Detailed error:', error);
      if (error.code === 'not-found') {
        // Handle not found error if needed
      }
      // Consider handling other potential errors too
    }
  };
};
