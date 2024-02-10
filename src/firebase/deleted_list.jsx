import { Alert } from 'react-native'
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';

export function usefirebaseDeletedList(navigation) {
    const [deletedLists, setDeletedLists] = useState([]);//item data from firestore

    const isFocusedScreen = useIsFocused();

    useEffect(() => {
        fetchDeletedDataFromFirestore();
    }, [isFocusedScreen]);

    const fetchDeletedDataFromFirestore = () => {
        const collectionRef = collection(FIREBASE_DB, 'deleted-list');
        getDocs(collectionRef).then((q) => {

            const newData = q.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return Promise.all(newData);

        }).then((data) => {
            setDeletedLists(data);

        }).catch((error) => {
            console.error('Error  document:', error);
        });
    };
    const addDeletedDataToFirestore = (data) => {

        const collectionRef = collection(FIREBASE_DB, 'deleted-list');


        const dataWithTimeStamp = { ...data, deletedTimeStamp: serverTimestamp() }

        addDoc(collectionRef, dataWithTimeStamp).then((docRef) => {
            console.log('Document written with ID: ', docRef.id);

        }).catch((error) => {

            console.error('Error adding document: ', error);
        })


    };
    const deleteDeletedDocument = (item) => {
        const documentIdToDelete = item.list_id; // Replace with the actual ID of the document you want to delete
        const collectionRef = collection(FIREBASE_DB, 'deleted-list');
        const doc = query(collectionRef, where('list_id', '==', documentIdToDelete), limit(1))
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
                    `${item.list_name} is deleted from your List`,
                    [
                        {
                            text: 'OK', onPress: () => {

                            }
                        }

                    ],

                );
                console.log('Document deleted successfully');

                fetchDeletedDataFromFirestore();
            })
            .catch((error) => {
                console.error('Error deleting document:', error);
            });
    };

    const DeleteListCollection = () => {
        const collectionRef = collection(FIREBASE_DB, 'deleted-list');

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
                console.log('All documents deleted successfully.');
                setDeletedLists([]);
            })
            .catch((error) => {
                console.error('Error deleting documents: ', error);
            });
    };
    return [deletedLists, deleteDeletedDocument, addDeletedDataToFirestore, fetchDeletedDataFromFirestore, DeleteListCollection];
}