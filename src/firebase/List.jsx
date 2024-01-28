import { Alert } from 'react-native'
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, updateDoc,serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import React, { useState } from "react";

export function usefirebaseList(navigation) {
    const [ListItemData, setListItemData] = useState({})

    const addListDataToFirestore = (data) => {

        const collectionRef = collection(FIREBASE_DB, 'list');
        
        const dataWithTimeStamp = { ...data, timeStamp: serverTimestamp() }
        addDoc(collectionRef, dataWithTimeStamp).then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
           

        }).catch((error) => {
           
            console.error('Error adding document: ', error);
        })


    };


    const fetchListDataFromFirestore = () => {

        const collectionRef = collection(FIREBASE_DB, 'list');
        getDocs(collectionRef).then((q) => {

            const newData = q.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setListItemData(newData);
            
            return Promise.resolve()
            
           
        }).catch((error) => {
            console.error('Error  document:', error);
        });
    };

    const deleteListDocument = (item) => {
        const documentIdToDelete = item.item_id; // Replace with the actual ID of the document you want to delete
        const collectionRef = collection(FIREBASE_DB, 'list');
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

                fetchListDataFromFirestore();
            })
            .catch((error) => {
                console.error('Error deleting document:', error);
            });
    };
    const updateListDocument = (item) => {
        const documentIdToUpdate = item.item_id;
        const collectionRef = collection(FIREBASE_DB, 'list');
        const queryRef = query(collectionRef, where('item_id', '==', documentIdToUpdate), limit(1));

        getDocs(queryRef)
            .then((querySnapshot) => {
                const updatePromises = [];
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const docRef = doc.ref;
                        updatePromises.push(updateDoc(docRef, item));
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
    return [ListItemData,setListItemData,fetchListDataFromFirestore,addListDataToFirestore,deleteListDocument,updateListDocument];
}