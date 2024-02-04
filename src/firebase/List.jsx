import { Alert } from 'react-native'
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import React, { useState } from "react";

export function usefirebaseList(navigation) {
    const [ListItemData, setListItemData] = useState({})


    const addListDataToFirestore = (data) => {

        const collectionRef = collection(FIREBASE_DB, 'list');
        const dataWithTime = { ...data, timeStamp: serverTimestamp()}
        
        addDoc(collectionRef, dataWithTime).then((docRef) => {           
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
        const documentIdToDelete = item.id;
        const collectionRef = collection(FIREBASE_DB, 'list');
        const docRef = doc(collectionRef, documentIdToDelete);

        deleteDoc(docRef)
            .then(() => {

                Alert.alert(
                    '\u{1F642} Deleted Successfully',
                    `${item.listname} is deleted from your List`,
                    [
                        {
                            text: 'OK', onPress: () => {
                                navigation.navigate('HomeTab')
                            }
                        }

                    ],

                );
                console.log('List deleted successfully');

                fetchListDataFromFirestore();
            })
            .catch((error) => {
                console.error('Error deleting document:', error);
            });
    };
    const updateListDocument = (item) => {
       
        const documentIdToUpdate = item.id;
        console.log(item)
        console.log(documentIdToUpdate)
        const collectionRef = collection(FIREBASE_DB, 'list');
        const queryRef = query(collectionRef,documentIdToUpdate);

        getDocs(queryRef)
            .then((querySnapshot) => {
                
                const updatePromises = [];
                // console.log(querySnapshot)
                if (!querySnapshot.empty) {
                    console.log("querySnapshot)",querySnapshot)
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
                    `${item.listname} is updated in your List`,
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                             
                            //   navigation.navigate('HomeTab')
                            }
                        }
                    ]
                );

            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });

    }
      
      
    return [ListItemData, setListItemData, fetchListDataFromFirestore, addListDataToFirestore, deleteListDocument, updateListDocument];
}