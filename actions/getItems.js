import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

export const getAllItemsByCurrentUser = async () => {
    const currentUser = getAuth().currentUser;
    const itemsRef = collection(db, 'items');
    const q = query(itemsRef, where('uid', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);

    const items = [];
    querySnapshot.forEach((doc) => {
        items.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));

    return sortedItems;
};
