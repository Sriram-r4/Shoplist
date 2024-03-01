import React ,{useEffect, useState} from "react";
import { collection,serverTimestamp,addDoc,getDocs,query,where ,limit ,updateDoc} from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import { Alert } from "react-native";

export function usefirebaseUser() {

    useEffect(()=>{
        fetchUser()
    },[users])

    const [users,setUsers]=useState([])
    
    const addUser = (data) => {
        
        
        const collectionRef = collection(FIREBASE_DB, 'User');


        const dataWithTimeStamp = { ...data, timeStamp: serverTimestamp(),userId:users.length+1 }

        addDoc(collectionRef, dataWithTimeStamp).then((docRef) => {
            

        }).catch((error) => {

            navigation.navigate("Error")
        })


    };
    const fetchUser = () => {
        const collectionRef = collection(FIREBASE_DB, 'User');
        getDocs(collectionRef).then((q) => {

            const newData = q.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return Promise.all(newData);

        }).then((data) => {
            setUsers(data);

        }).catch((error) => {
            navigation.navigate("Error")
        });
    };
  
    const updateUser = (item) => {
        const documentIdToUpdate = 1;
        const collectionRef = collection(FIREBASE_DB, 'User');
        const queryRef = query(collectionRef, where('userId', '==', documentIdToUpdate), limit(1));

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
            .catch((error) => {
                navigation.navigate("Error")
            });

    }
  
    return [users,addUser,fetchUser,updateUser];
}