import { Alert } from 'react-native'
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import React, { useState } from "react";

export function usefirebaseOrderedList() {
    const [confirmedItems, setConfirmedItems] = useState([])

    const addFinalDataToFirestore = (data) => {

        const collectionRef = collection(FIREBASE_DB, 'ordered-list');
        //    setDisabled(true); 
        console.log("data to add:", data)

        addDoc(collectionRef, data).then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
            // setTimeout(() => setDisabled(false), 5000)
            // setItem_id(item_id + 1);

        }).catch((error) => {
            // setDisabled(false)
            console.error('Error adding document: ', error);
        })


    };


    const fetchFinalDataFromFirestore = () => {

        const collectionRef = collection(FIREBASE_DB, 'ordered-list');
        getDocs(collectionRef).then((q) => {

            const newData = q.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return Promise.all(newData);
           
        }).then((data)=>{
            setConfirmedItems(data);
            console.log(data);
            console.log("confirmed Items from Firestore Database", confirmedItems)
        }).catch((error) => {
            console.error('Error  document:', error);
        });
    };
    return [confirmedItems,fetchFinalDataFromFirestore,addFinalDataToFirestore];
}