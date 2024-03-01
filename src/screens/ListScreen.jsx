import { View, Text ,Alert} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Stepper from 'react-native-stepper-view';
import ListInfo from '../components/ListInfo'
import PreviewTable from '../components/PreviewTable'
import CustomButton from '../components/CustomButton';
import { usefirebaseList } from '../firebase/List';
import Toast, { BaseToast } from 'react-native-toast-message';

export default function ListScreen({route,navigation}) {

    const [ListItemData,setListItemData,fetchListDataFromFirestore,addListDataToFirestore,deleteListDocument,updateListDocument]=usefirebaseList(navigation)
    const ListItems=route.params.listItems
    
    const stepperRef = useRef();
    let ListData={};

   
        
   
    const handleSubmit = React.useCallback(() => {
      
        Alert.alert(
            '\u{1F914} Add List?',
            "Added Items Will be displayed in Lists",
            [

                {
                    text: 'CANCEL', onPress: () => {

                    }
                },
                {
                    text: 'OK', onPress: () => {
                        if(Object.keys(ListData)!=0){
                        addListDataToFirestore(ListData)}
                        navigation.navigate("Lists",{ListDetail:ListData})                      
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

    const handleListDetails=({listname,listdes,liststatus})=>{
        
        ListData={listname,listdes,liststatus,ListItems}  
        console.log(ListData)  
        Toast.show({
            type: 'success',
            text1: "List Information added successfully",
            text2: "Press Next to continue",
            visibilityTime: 5000,
            text1Style: { color: "#00895c", fontSize: 16 },
            text2Style: { color: "#00695c", fontSize: 14 },
            position: "top",

        });  
        
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
   
    return (
        <SafeAreaView style={{
            width: wp(100),
            height: hp(93),
        }} className="bg-teal-50/[0.8]  ">
            <Stepper
                ref={stepperRef}
                onSubmit={handleSubmit}
                onPrevStep={() => handlePrevious}
                onNextStep={() => handleNext}
                numberOfSteps={2}
                buttonsContainerStyle={{ backgroundColor: "#f0f8f7", borderRadius: 50, margin: 2, padding: 2, color: "#fff", width: wp(95), height: hp(10), alignSelf: "center", justifyContent: "space-around", }}
                ButtonComponent={(props) => <CustomButton {...props} />}
            >

                <Stepper.Step label="List"
                    {...ProgressStepStyles}>
                    <View style={{ width: wp(100), height: hp(61.7) }} className='flex items-center p-1 justify-center'>
                        <View style={{ width: wp(95), height: hp(59) }} className='px-3  py-2 m-1'>
                            
                            <ListInfo   handleListDetails={handleListDetails}/>
                            <Toast style={{ zIndex: 1000 }} />
                        </View>
                    </View>
                </Stepper.Step>
                <Stepper.Step label="Preview"
                    {...ProgressStepStyles}>
                    <View style={{ width: wp(100), height: hp(61.7) }} className='flex items-center justify-center'>
                        <View style={{ width: wp(95), height: hp(55) }} className='pb-2 pt-0 px-1 m-1'>
                            <Text className="text-teal-700 text-xl text-center font-medium">Check Table Data</Text>

                            <PreviewTable tableData={ListItems} />

                        </View>
                    </View>
                </Stepper.Step>
            </Stepper>

        </SafeAreaView>
    )
}