import { collectionGroup, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

export const getAllEntriesByCurrentUser = async (itemId, onEntriesUpdate) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
        return [];
    }

    // Query the entries collection group
    const entriesQuery = query(
        collectionGroup(db, 'entries'),
        where('uid', '==', currentUser.uid),
        where('itemId', '==', itemId),
        orderBy('date', 'desc')
    );

    // Set up the onSnapshot listener for realtime updates
    const unsubscribe = onSnapshot(entriesQuery, (snapshot) => {
        const updatedEntries = snapshot.docs.map((doc) => {
            const data = doc.data();
            // Convert timestamp to JS date object
            data.date = data.date.toDate();
            return { id: doc.id, ...data };
        });

        // Call the callback function with the updated entries
        onEntriesUpdate(updatedEntries);
    }, (error) => {
        console.log('Error getting entries collection updates: ', error);
    });

    // Return the unsubscribe function to clean up the listener when needed
    return unsubscribe;
};
