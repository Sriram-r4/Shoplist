import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Stepper from 'react-native-stepper-view';
import PreviewTable from '../components/PreviewTable'
import MultiInputTable from '../components/MultiInputTable'
import ItemCard from '../components/ItemCard'
import CustomButton from '../components/CustomButton';
import Toast from 'react-native-toast-message';
import { usefirebaseItemList } from '../firebase/Item_list';
import { usefirebaseOrderedList } from '../firebase/Ordered_list';


export default function NewScreen({ navigation, route }) {
    const selectedItem = route.params;
    const [selectedItemName, setSelectedItemName] = useState(selectedItem);

    //dont remove updateDocument even if it is unused 
    //if you try to remove then it shows item_id does not exists 
    const [items, disabled, handleItemData, updateDocument, deleteDocument, fetchDataFromFirestore, DeleteCollection] = usefirebaseItemList(navigation);

    const [confirmedItems, fetchFinalDataFromFirestore, addFinalDataToFirestore] = usefirebaseOrderedList();



    const stepperRef = useRef();

    useEffect(() => {
        fetchDataFromFirestore()

    }, [route.params])

    useEffect(() => {
        fetchFinalDataFromFirestore()
    }, [route.params])



    const handleSubmit = () => {
        if (items.length != 0) {
            Alert.alert(
                '\u{1F914} Add Items?',
                "Added Items Will be displayed in Home",
                [

                    {
                        text: 'CANCEL', onPress: () => {

                        }
                    },
                    {
                        text: 'OK', onPress: () => {
                            items.map(i => addFinalDataToFirestore(i));
                            stepperRef.current.prevStep();
                            DeleteCollection();
                        }
                    }

                ],

            );
        }
        else {
            Alert.alert(
                '\u{1F61E} No Items to Submit!',
                "Add Items to Submit",
                [

                    {
                        text: 'OK', onPress: () => {
                            stepperRef.current.prevStep();
                        }
                    }

                ],

            );
        }
    }

   
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
                numberOfSteps={2}
                buttonsContainerStyle={{ backgroundColor: "#f0f8f7", borderRadius: 50, margin: 2, padding: 2, color: "#fff", width: wp(95), height: hp(10), alignSelf: "center", justifyContent: "space-around", }}
                // ButtonComponent={(props) => <CustomButton {...props} />}
            >

                <Stepper.Step label="Item"
                    {...ProgressStepStyles}>
                    <View style={{ width: wp(100), height: hp(61.7) }} className='flex items-center p-1 justify-center'>
                        <View style={{ width: wp(95), height: hp(59) }} className='px-3  py-2 m-1'>
                            <Text className="text-teal-700 text-xl text-center font-medium">Enter Table Details</Text>
                            <MultiInputTable navigation={navigation} itemname={selectedItem !== undefined ? selectedItem : {}} handleItemData={handleItemData} disabled={disabled} />
                            <ItemCard items={items} navigation={navigation} showCardMessage={showCardMessage} deleteDocument={deleteDocument} />
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