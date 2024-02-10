import { Alert } from 'react-native'
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, updateDoc,orderBy,serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import React, { useState } from "react";

export function usefirebaseOrderedList(navigation) {
    const [confirmedItems, setConfirmedItems] = useState([])

    const generateNextItemId = async() => {
        const collectionRef = collection(FIREBASE_DB, 'ordered-list');
    
        return getDocs(query(collectionRef, orderBy('item_id', 'desc'), limit(1)))
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const lastItemId = querySnapshot.docs[0].data().item_id;
                    const nextItemId = lastItemId + 1;
                    return nextItemId;
                } else {
                    // If no documents found, start with 1
                    return 1;
                }
            })
            .catch((error) => {
                console.error('Error generating next list_id: ', error);
                throw error; // rethrow the error for further handling
            });
    };
    
    const addFinalDataToFirestore = (data) => {
        generateNextItemId()
            .then((nextItemId) => {
                const collectionRef = collection(FIREBASE_DB, 'ordered-list');
                const dataWithTimeAndId = { ...data, timeStamp: serverTimestamp(), item_id: nextItemId };
    
                return addDoc(collectionRef, dataWithTimeAndId);
            })
            .then((docRef) => {
                console.log('Document written with ID: ', docRef.id);
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            });
    };

    const fetchFinalDataFromFirestore = () => {

        const collectionRef = collection(FIREBASE_DB, 'ordered-list');
        getDocs(collectionRef).then((q) => {

            const newData = q.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setConfirmedItems(newData);
            
            return Promise.resolve()
            
           
        }).catch((error) => {
            console.error('Error  document:', error);
        });
    };

    const deleteFinalDocument = (item) => {
        const documentIdToDelete = item.item_id; // Replace with the actual ID of the document you want to delete
        const collectionRef = collection(FIREBASE_DB, 'ordered-list');
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
                               navigation.navigate('HomeTab')
                            }
                        }

                    ],

                );
                console.log('Document deleted successfully');

                fetchFinalDataFromFirestore();
            })
            .catch((error) => {
                console.error('Error deleting document:', error);
            });
    };
    const updateFinalDocument = (item) => {
        const documentIdToUpdate = item.item_id;
        const collectionRef = collection(FIREBASE_DB, 'ordered-list');
        const queryRef = query(collectionRef, where('item_id', '==', documentIdToUpdate), limit(1));

        getDocs(queryRef)
            .then((querySnapshot) => {
                const updatePromises = [];
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const docRef = doc.ref;
                        updatePromises.push(updateDoc(docRef, {...item,updateTimeStamp:serverTimestamp()}));
                    });
                    return Promise.all(updatePromises);
                }

            })
            .then(() => {
                
                Alert.alert(
                    '\u{1F642} Updated Successfully',
                    `${item.itemName} is updated in your List`,
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                             
                              navigation.navigate('HomeTab')
                            }
                        }
                    ]
                );

            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });

    }
    return [confirmedItems,fetchFinalDataFromFirestore,addFinalDataToFirestore,deleteFinalDocument,updateFinalDocument];
}