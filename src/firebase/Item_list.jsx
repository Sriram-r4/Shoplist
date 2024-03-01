import { Alert } from 'react-native'
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { FIREBASE_APP, FIREBASE_DB } from '../../firebaseConfig';
import React, { useEffect, useState } from 'react'
import { usefirebaseOrderedList } from './Ordered_list';

export function usefirebaseItemList(navigation) {
    const [items, setItems] = useState([]);//item data from firestore
   
    const [disabled, setDisabled] = useState(false);//Add Item button state(disabled or not)

    const [confirmedItems, fetchFinalDataFromFirestore, addFinalDataToFirestore, deleteFinalDocument, updateFinalDocument] = usefirebaseOrderedList();

    useEffect(() => {
        fetchDataFromFirestore();
    }, [items]);

    useEffect(() => {
        fetchFinalDataFromFirestore();
    }, []);



    const handleItemData = (item) => {

        if (item.itemName != "" && item.itemCategory != "") {

            if (items.length !== 0) {
                let checkItem = items.filter(i => i.itemName == item.itemName);

                if (checkItem.length == 0) {
                    const addedItems = confirmedItems.map(i => i.itemName)

                    if (!addedItems.includes(item.itemName)) {
                        
                            items.sort((a, b) => b.item_id - a.item_id);
                            const first = items[0];
                            item.item_id = first.item_id + 1;
                            addDataToFirestore(item);

                    }
                    else {
                        Alert.alert(`\u{1F61E} ${item.itemName} is already present`,
                            `Remove ${item.itemName} in Your Items to add or change`,
                            [
                                { text: "OK", onPress: () => { } }
                            ]
                        )
                    }

                }
                else {
                    Alert.alert(
                        '\u{1F61E} Item Already Exists!',
                        'You have selected an Item with name and category already present.',
                        [
                            { text: 'OK', onPress: () => { { /*setcardItem Item Name and Category Name to empty*/ } } },
                        ],

                    );
                }

            }
            else {
                const addedItems = confirmedItems.map(i => i.itemName)
                if (!addedItems.includes(item.itemName)) {
                    if (confirmedItems.length == 0) {
                        item.item_id = 1;
                        addDataToFirestore(item);
                    }
                    else {
                        const sortedConfirmedItems = confirmedItems.sort((a, b) => b.item_id - a.item_id);
                        const firstSortedElement = sortedConfirmedItems[0];
                        item.item_id = firstSortedElement.item_id + 1;
                        addDataToFirestore(item);
                    }

                }
                else {
                    Alert.alert(`\u{1F61E} ${item.itemName} is already present`,
                        `Remove ${item.itemName} in Your Items to add or change`,
                        [
                            { text: "OK", onPress: () => { } }
                        ]
                    )
                }
            }
        }
    };

    const fetchDataFromFirestore = () => {
        const collectionRef = collection(FIREBASE_DB, 'item-list');
        getDocs(collectionRef).then((q) => {

            const newData = q.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return Promise.all(newData);

        }).then((data) => {
            setItems(data);

        }).catch((error) => {
           navigation.navigate("Error")
        });
    };
    const addDataToFirestore = (data) => {

        const collectionRef = collection(FIREBASE_DB, 'item-list');
        setDisabled(true);

        const dataWithTimeStamp = { ...data, timeStamp: serverTimestamp() }

        addDoc(collectionRef, dataWithTimeStamp).then((docRef) => {
            setTimeout(() => setDisabled(false), 5000)
           

        }).catch((error) => {
            setDisabled(false)
            navigation.navigate("Error")
        })


    };
    const deleteDocument = (item) => {
        const documentIdToDelete = item.item_id; // Replace with the actual ID of the document you want to delete
        const collectionRef = collection(FIREBASE_DB, 'item-list');
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
               

                fetchDataFromFirestore();
            })
            .catch((error) => {
                navigation.navigate("Error")
            });
    };
    const updateDocument = (item) => {
        const documentIdToUpdate = item.item_id;
        const collectionRef = collection(FIREBASE_DB, 'item-list');
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
                                navigation.navigate("New", items);
                            }
                        }
                    ]
                );

            })
            .catch((error) => {
                navigation.navigate("Error")
            });

    }
    const DeleteCollection = () => {
        const collectionRef = collection(FIREBASE_DB, 'item-list');

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
                setItems([]);
            })
            .catch((error) => {
                navigation.navigate("Error")
            });
    };
    return [items, disabled, handleItemData, updateDocument, deleteDocument, fetchDataFromFirestore, DeleteCollection];
}