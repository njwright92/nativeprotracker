import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

export const getAllItemsByCurrentUser = async () => {
    try {
        const currentUser = getAuth().currentUser;
        const itemsRef = collection(db, 'items');
        const q = query(itemsRef, where('uid', '==', currentUser.uid), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);

        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return items;
    } catch (error) {
        throw error;
    }
};
