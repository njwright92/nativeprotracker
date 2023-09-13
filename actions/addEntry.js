import { ADD_ENTRY } from './types';
import { onSnapshot, addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from "firebase/auth";

export const addEntry = (itemId, quantity, date) => {
    return async (dispatch) => {
        const auth = getAuth();
        const user = auth.currentUser;

        const newEntry = {
            itemId,
            quantity,
            date: date,
            uid: user.uid
        };

        try {
            const docRef = await addDoc(collection(db, "items", itemId, "entries"), newEntry);


            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const entryData = { ...docSnap.data(), id: docRef.id };
                dispatch({
                    type: ADD_ENTRY,
                    payload: entryData,
                });

                window.alert('Success', 'Entry added successfully!');

                onSnapshot(collection(db, "items", itemId, "entries"), (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === "added") {
                            

                        }
                    });
                }, (error) => {
                    console.log('Error getting entries collection updates: ', error);
                });
            }
        } catch (error) {
            window.alert('failed', 'Entry not added!');
        }
    };
};
