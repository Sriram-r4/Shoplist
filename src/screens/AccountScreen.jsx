import { View, Text } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import UnderDev from '../../assets/UnderDev.png'
import LottieView from 'lottie-react-native';

export default function AccountScreen() {

  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(85),
    }} className="bg-teal-50/[0.8]  ">
      <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>

        <LottieView style={{ width: wp(60), height: hp(60) }} source={require("../../assets/Animation - 1705163637052.json")} autoPlay loop />
        <Text className="text-2xl font-bold text-center text-teal-700 align-middle">Working on Updates...</Text>

      </View>
    </SafeAreaView>
  )
}