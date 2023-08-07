import { EDIT_NOTE } from './types';

export const editNote = (itemId, noteId, newNote) => {
  return async (dispatch) => {
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      const noteRef = doc(
        collection(db, 'items', itemId, 'notes'),
        noteId
      );
      const noteDoc = await getDoc(noteRef);

      await setDoc(noteRef, {
        ...noteDoc.data(),
        note: newNote.note || ''
      });

      dispatch({
        type: EDIT_NOTE,
        payload: {
          itemId,
          noteId,
          note: newNote.note,
          uid: user.uid
        },
      });

      onSnapshot(noteRef, (doc) => {
        const updatedNote = { ...doc.data(), id: doc.id };
        console.log('editNote snapshot', updatedNote);
      });
    } catch (error) {
      console.error('Error updating document: ', error);
      if (error.code === 'not-found') {
        // Handle not found error if needed
      }
    }
  };
};
