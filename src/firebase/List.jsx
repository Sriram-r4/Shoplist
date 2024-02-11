import { Alert } from 'react-native'
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, doc, updateDoc, serverTimestamp ,orderBy} from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import React, { useState } from "react";

export function usefirebaseList(navigation) {
    const [ListItemData, setListItemData] = useState({})


    const generateNextListId = async() => {
        const collectionRef = collection(FIREBASE_DB, 'list');
    
        return getDocs(query(collectionRef, orderBy('list_id', 'desc'), limit(1)))
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const lastListId = querySnapshot.docs[0].data().list_id;
                    const nextListId = lastListId + 1;
                    return nextListId;
                } else {
                    // If no documents found, start with 1
                    return 1;
                }
            })
            .catch((error) => {
                console.error('Error generating next list_id: ', error);
                
            });
    };
    
    const addListDataToFirestore = (data) => {
        generateNextListId()
            .then((nextListId) => {
                const collectionRef = collection(FIREBASE_DB, 'list');
                const dataWithTimeAndId = { ...data, timeStamp: serverTimestamp(), list_id: nextListId };
    
                return addDoc(collectionRef, dataWithTimeAndId);
            })
            .then((docRef) => {
                console.log('Document written with ID: ', docRef.id);
            })
            .catch((error) => {
                console.error('Error adding document: ', error);
            });
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
       
        const documentIdToUpdate = item.list_id;
        const collectionRef = collection(FIREBASE_DB, 'list');
        const queryRef = query(collectionRef,where("list_id","==",documentIdToUpdate),limit(1));
        const updateDate={...item,UpdatetimeStamp:serverTimestamp()}

        getDocs(queryRef)
            .then((querySnapshot) => {
                
                const updatePromises = [];
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const docRef = doc.ref;
                        updatePromises.push(updateDoc(docRef,updateDate));
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
      
      
    return [ListItemData, setListItemData, fetchListDataFromFirestore, addListDataToFirestore, deleteListDocument, updateListDocument];
}