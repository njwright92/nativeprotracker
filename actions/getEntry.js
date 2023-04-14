import { collectionGroup, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

export const getAllEntriesByCurrentUser = async () => {
    const currentUser = getAuth().currentUser;
    const q = query(
        collectionGroup(db, 'entries'),
        where('uid', '==', currentUser.uid),
    );

    const querySnapshot = await getDocs(q);

    const entries = [];
    querySnapshot.forEach((doc) => {
        entries.push({
            id: doc.id,
            ...doc.data(),
        });
        console.log(entries)
    });

    const allEntries = await getDocs(collectionGroup(db, 'entries'));

    const allEntriesByCurrentUser = allEntries.docs
        .filter(doc => doc.data().uid === currentUser.uid)
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.date.seconds - a.date.seconds)

    const doc = entries[0]?.itemId;

    const entriesWithDocId = allEntriesByCurrentUser.filter(entry => entry.itemId === doc);

    console.log(entriesWithDocId);

    console.log(allEntriesByCurrentUser);

    return allEntriesByCurrentUser;
};
