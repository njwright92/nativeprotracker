import { collectionGroup, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

export const getAllEntriesByCurrentUser = async () => {
    const currentUser = getAuth().currentUser;
    const q = query(
        collectionGroup(db, 'entries'),
        where('uid', '==', currentUser.uid)
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

    return entries;
};
