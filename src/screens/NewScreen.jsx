import { View, Text} from 'react-native'
import React, {  useEffect, useState, useRef } from 'react'
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

export default function NewScreen({ navigation,route }) {
    const selectedItem=route.params;
   
    const table = [...TABLE_DATA];
    const [data, setData] = useState();
    const [item, setItem] = useState({})
      
    const stepperRef = useRef();
   
    const handleSubmit = React.useCallback(() => {
        console.log('submitted');
        stepperRef.current.prevStep();
        
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

    useEffect(() => {
        setData(table);
  
    }, [])
    // useEffect(()=>{
    //     if(SelectedItem  && Object.keys(SelectedItem).length!==0){
    //         setItem(SelectedItem);
    //     }
    // },[])
 
    const ProgressStepStyles={
        progressBarBgColor:'#76a89f',
        completedProgressBarBgColor:'#2dd4bf',
        completedCheckColor:"#fff",
        disabledStepIconBgColor:"#76a89f",
        labelColor:"#76a89f",
        completedLabelColor:'#2dd4bf',
        completedStepIconBgColor:"#2dd4bf",
        activeStepIconBgColor:"#00695c",
        activeStepIconBorderColor:"#00695c",
        activeLabelColor:"#00695c",
        activeStepNumColor:"#fff"
    }
    const label=["Next","Previous","Submit"]

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
                buttonsContainerStyle={{backgroundColor:"#f0f8f7",borderRadius:50, margin: 2, padding: 2, color: "#fff", width: wp(95), height: hp(10), alignSelf: "center", justifyContent: "space-around",}}
                ButtonComponent={(props) => <CustomButton {...props} />}
            >



                <Stepper.Step label="Item"
                  {...ProgressStepStyles}>
                    <View style={{ width: wp(100), height: hp(57) }} className='flex items-center justify-center'>
                        <View style={{ width: wp(95), height: hp(57) }} className='p-2 m-2'>
                            <Text className="text-teal-700 text-xl text-center font-medium">Enter Table Details</Text>
                            <MultiInputTable itemData={itemData} navigation={navigation} itemname={selectedItem!==undefined?selectedItem:{}}  />
                            <ItemCard />
                        </View>
                    </View>
                </Stepper.Step>
                <Stepper.Step label="Preview"
                  {...ProgressStepStyles}>
                    <View style={{ width: wp(100), height: hp(61.7) }} className='flex items-center justify-center'>
                        <View style={{ width: wp(95), height: hp(55) }} className='pb-2 pt-0 px-1 m-1'>
                            <Text className="text-teal-700 text-xl text-center font-medium">Check Table Data</Text>

                            <PreviewTable tableData={data} />

                        </View>
                    </View>
                </Stepper.Step>
            </Stepper>

        </SafeAreaView>
    )

}