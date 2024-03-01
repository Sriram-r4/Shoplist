import { Alert } from 'react-native'
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';

export function usefirebaseDeletedItem(navigation) {
    const [deletedItems, setDeletedItems] = useState([]);//item data from firestore

    const isFocusedScreen = useIsFocused();

    useEffect(() => {
        fetchDeletedItemsFromFirestore();
    }, [isFocusedScreen]);

    const fetchDeletedItemsFromFirestore = () => {
        const collectionRef = collection(FIREBASE_DB, 'deleted-item');
        getDocs(collectionRef).then((q) => {

            const newData = q.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return Promise.all(newData);

        }).then((data) => {
            setDeletedItems(data);

        }).catch((error) => {
            navigation.navigate("Error")
        });
    };
    const addDeletedItemsToFirestore = (data) => {

        const collectionRef = collection(FIREBASE_DB, 'deleted-item');


        const dataWithTimeStamp = { ...data, deletedTimeStamp: serverTimestamp() }

        addDoc(collectionRef, dataWithTimeStamp).then((docRef) => {
            

        }).catch((error) => {

            navigation.navigate("Error")
        })


    };
    const deleteDeletedItemDocument = (item) => {
        const documentIdToDelete = item.item_id; // Replace with the actual ID of the document you want to delete
        const collectionRef = collection(FIREBASE_DB, 'deleted-item');
        const doc = query(collectionRef, where('item_id', '==', documentIdToDelete), limit(1))
        getDocs(doc)

            .then((querySnapshot) => {
                // Step 2: Check if there is a matching document
                const deletePromises = [];
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const docRef = doc.ref;
                        deletePromises.push(deleteDoc(docRef));
                    });

                    // Wait for all delete promises to complete
                    return Promise.all(deletePromises);
                }
            })
            .then(() => {

                Alert.alert(
                    '\u{1F642} Deleted Successfully',
                    `${item.itemName} is deleted from your List`,
                    [
                        {
                            text: 'OK', onPress: () => {

                            }
                        }

                    ],

                );
                

                fetchDeletedItemsFromFirestore();
            })
            .catch((error) => {
                navigation.navigate("Error")
            });
    };

    const DeleteItemCollection = () => {
        const collectionRef = collection(FIREBASE_DB, 'deleted-item');

        // Fetch all documents from the collection
        getDocs(collectionRef)
            .then((querySnapshot) => {
                // Delete each document
                const deletePromises = querySnapshot.docs.map((doc) =>
                    deleteDoc(doc.ref)
                );

                // Wait for all document deletions to complete
                return Promise.all(deletePromises);
            })
            .then(() => {
                setDeletedItems([]);
            })
            .catch((error) => {
                navigation.navigate("Error")
            });
    };
    return [deletedItems, deleteDeletedItemDocument, addDeletedItemsToFirestore, fetchDeletedItemsFromFirestore, DeleteItemCollection];
}