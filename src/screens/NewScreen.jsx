import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Stepper from 'react-native-stepper-view';
import ListInfo from '../components/ListInfo'
import PreviewTable from '../components/PreviewTable'
import MultiInputTable from '../components/MultiInputTable'
import TABLE_DATA from '../constants/TABLE_DATA.json'
import ItemCard from '../components/ItemCard'
import { Button } from 'react-native-paper'
import CustomButton from '../components/CustomButton';
import Toast from 'react-native-toast-message';
import { collection, addDoc, getDocs, query, where, limit, deleteDoc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';




export default function NewScreen({ navigation, route }) {
    const selectedItem = route.params;

    const [item_id, setItem_id] = useState(1);
    const [cardItem, setCardItem] = useState({});

    const [items, setItems] = useState([]);//item data from firestore
    const [disabled, setDisabled] = useState(false);//Add Item button state(disabled or not)

    const table = [...TABLE_DATA];
    const [data, setData] = useState([]);
    const [item, setItem] = useState({})

    const stepperRef = useRef();

    const handleSubmit = React.useCallback(() => {

        Alert.alert(
            '\u{1F914} Add Items?',
            "Added Items Will be displayed in Home",
            [

                {
                    text: 'CANCEL', onPress: () => {
                        console.log('CANCEL');
                    }
                },
                {
                    text: 'OK', onPress: () => {
                        console.log('submitted');
                        stepperRef.current.prevStep();
                    }
                }

            ],

        );



    }, [])

    const handlePrevious = React.useCallback(() => {
        console.log('navigate to:', prevStep);
    }, []);

    const handleNext = React.useCallback(() => {
        console.log('navigate to:', nextStep);
    }, []);

    function itemData(itm) {
        setItem(itm);
    }

    // useEffect(() => {
    //     setData(table);

    // }, [])
    // useEffect(()=>{
    //     if(SelectedItem  && Object.keys(SelectedItem).length!==0){
    //         setItem(SelectedItem);
    //     }
    // },[])

    const ProgressStepStyles = {
        progressBarBgColor: '#76a89f',
        completedProgressBarBgColor: '#2dd4bf',
        completedCheckColor: "#fff",
        disabledStepIconBgColor: "#76a89f",
        labelColor: "#76a89f",
        completedLabelColor: '#2dd4bf',
        completedStepIconBgColor: "#2dd4bf",
        activeStepIconBgColor: "#00695c",
        activeStepIconBorderColor: "#00695c",
        activeLabelColor: "#00695c",
        activeStepNumColor: "#fff"
    }
    const label = ["Next", "Previous", "Submit"]

    const fetchDataFromFirestore = () => {
        const collectionRef = collection(FIREBASE_DB, 'item-list');
        getDocs(collectionRef).then((q) => {

            const newData = q.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(newData);
            setItems(newData);
        });
    };

    useEffect(() => {
        fetchDataFromFirestore();
        console.log("Items from Firestore Database", items)
    }, [item_id]);


    const handleItemData = (item) => {
        if (item.itemName != "" && item.itemCategory != "") {

            if (items.length !== 0) {
                let checkItem = items.filter(i => i.itemName == item.itemName);
                console.log("cardItem:", item);
                if (checkItem.length == 0) {
                    item.item_id = items.length + 1;
                    addDataToFirestore(item)

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
                console.log(item)
            }
            else {
                item.item_id = items.length + 1;
                addDataToFirestore(item);
            }
        }
    };


    const addDataToFirestore = (data) => {

        const collectionRef = collection(FIREBASE_DB, 'item-list');
        setDisabled(true);
        console.log("data to add:", data)

        addDoc(collectionRef, data).then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
            setTimeout(() => setDisabled(false), 5000)
            setItem_id(item_id + 1);

        }).catch((error) => {
            setDisabled(false)
            console.error('Error adding document: ', error);
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
                                console.log('submitted');
                            }
                        }

                    ],

                );
                console.log('Document deleted successfully');

                fetchDataFromFirestore();
            })
            .catch((error) => {
                console.error('Error deleting document:', error);
            });
    };

    const updateDocument = (item, updatedData) => {
        const documentIdToUpdate = item.item_id;
        const collectionRef = collection(FIREBASE_DB, 'item-list');
        const queryRef = query(collectionRef, where('item_id', '==', documentIdToUpdate), limit(1));
    
        getDocs(queryRef)
            .then((querySnapshot) => {
                const updatePromises = [];
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        const docRef = doc.ref;
                        updatePromises.push(updateDoc(docRef, updatedData));
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
                                console.log('submitted');
                            }
                        }
                    ]
                );
                console.log('Document updated successfully');
                fetchDataFromFirestore();
            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });
    };

    const showCardMessage = (item) => {
        Toast.show({
            type: 'success',
            text1: item.itemName,
            text2: item.itemCategory,
            visibilityTime: 1300,
            text1Style: { color: "#00895c", fontSize: 16 },
            text2Style: { color: "#00695c", fontSize: 14 },
            position: "top",

        });
    }

    return (
        <SafeAreaView style={{
            width: wp(100),
            height: hp(85),
        }} className="bg-teal-50/[0.8] ">

            <Stepper
                ref={stepperRef}
                onSubmit={handleSubmit}
                onPrevStep={() => handlePrevious}
                onNextStep={() => handleNext}
                numberOfSteps={2}
                buttonsContainerStyle={{ backgroundColor: "#f0f8f7", borderRadius: 50, margin: 2, padding: 2, color: "#fff", width: wp(95), height: hp(10), alignSelf: "center", justifyContent: "space-around", }}
                ButtonComponent={(props) => <CustomButton {...props} />}
            >

                <Stepper.Step label="Item"
                    {...ProgressStepStyles}>
                    <View style={{ width: wp(100), height: hp(61.7) }} className='flex items-center p-1 justify-center'>
                        <View style={{ width: wp(95), height: hp(59) }} className='px-3  py-2 m-1'>
                            <Text className="text-teal-700 text-xl text-center font-medium">Enter Table Details</Text>
                            <MultiInputTable itemData={itemData} navigation={navigation} itemname={selectedItem !== undefined ? selectedItem : {}} handleItemData={handleItemData} disabled={disabled} />
                            <ItemCard items={items} showCardMessage={showCardMessage} deleteDocument={deleteDocument} updateDocument={updateDocument}/>
                            <Toast style={{ zIndex: 1000 }} />
                        </View>
                    </View>
                </Stepper.Step>
                <Stepper.Step label="Preview"
                    {...ProgressStepStyles}>
                    <View style={{ width: wp(100), height: hp(61.7) }} className='flex items-center justify-center'>
                        <View style={{ width: wp(95), height: hp(55) }} className='pb-2 pt-0 px-1 m-1'>
                            <Text className="text-teal-700 text-xl text-center font-medium">Check Table Data</Text>

                            <PreviewTable tableData={items} />

                        </View>
                    </View>
                </Stepper.Step>
            </Stepper>

        </SafeAreaView>
    )

}