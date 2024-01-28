import { View, Text, Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import LottieView from 'lottie-react-native';

export default function ListsScreen({route}) {

  let ListDetails;
  
    if(route.params!==undefined){
     ListDetails=route.params.ListDetail}
  
  

  // console.log("List Details in Lists Screen",ListDetails)

 

  
  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(85),
    }} className="bg-teal-50/[0.8]">
      {/* <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>

        <LottieView style={{ width: wp(60), height: hp(60) }} source={require("../../assets/Animation - 1705163637052.json")} autoPlay loop />
        <Text className="text-2xl font-bold text-center text-teal-700 align-middle">Working on Updates...</Text>

      </View> */}
      {ListDetails!==undefined?
      <View style={{ height: hp(17), width: wp(95) }} className="bg-teal-100 self-center   rounded-xl" >
        <View style={{ height: hp(5), width: wp(95) }} className="flex-row my-2 justify-around">
          <Text style={{ height: hp(5), width: wp(70) }} className=" text-xl font-semibold text-teal-800 px-2  py-1">
            {ListDetails.listname}
          </Text>
          <View style={{ height: hp(5), width: wp(10) }} className="bg-yellow-400 rounded-full "></View>
        </View>
        <View style={{ height: hp(9), width: wp(95) }} className="flex-row justify-around">
          <Text style={{ height: hp(9), width: wp(90) }} className=" text-normal text-teal-800 text-ellipsis px-2  py-1">
          {ListDetails.listdes}          
          </Text>
        </View>
      </View>:<View/>}

    </SafeAreaView>
  )
}