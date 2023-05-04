import { ADD_ITEM } from './types';
import { onSnapshot, addDoc, collection, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
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
            console.log('addItem', newItem);

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const itemData = { ...docSnap.data(), id: docRef.id };
                dispatch({
                    type: ADD_ITEM,
                    payload: itemData,
                });

                // listen for updates to the 'items' collection
                onSnapshot(collection(db, "items"), (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === "added") {
                            const newItemData = { ...change.doc.data(), id: change.doc.id };
                            console.log('New item added: ', newItemData);
                            // you can dispatch an action here if you want to update your app's state
                        }
                    });
                }, (error) => {
                    console.log('Error getting items collection updates: ', error);
                });
            }
        } catch (error) {
            console.log('Error adding document: ', error);
        }
    };
};
