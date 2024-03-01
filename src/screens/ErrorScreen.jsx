import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp ,widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LottieView from "lottie-react-native"


export default function ErrorScreen() {
  return (
   <SafeAreaView style={{height:hp(100),width:wp(100)}}>
    <Text className="mx-2 mb-2 text-4xl font-bold text-red-700"> Error!</Text>
    <Text className="mx-2 mb-2 text-2xl font-semibold text-red-700">  Something went wrong</Text>
    <View style={{ height: hp(85), width: wp(95) }} className=" flex-1 items-center justify-center self-center">
                    <LottieView source={require("../../assets/NoInternet.json")} style={{ height: hp(30), width: wp(60), alignSelf: "center", alignItems: "center" }} autoPlay />
                    <Text style={{ height: hp(20) }} className="text-red-500 text-2xl font-semibold text-center ">Error processing your action. Please check your Internet Connectivity or try again later. </Text>
     </View>
   </SafeAreaView>
  )
}