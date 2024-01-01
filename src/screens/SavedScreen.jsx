import { View, Text ,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen'
import UnderDev from '../../assets/UnderDev.png'

export default function SavedScreen() {
  return (
    <SafeAreaView style={{
      width:wp(100),
      height:hp(85),
    }} className="bg-teal-50/[0.8]">
    <View>
    <Image source={UnderDev} style={{width:wp(90),height:hp(50),resizeMode:'cover',alignSelf:'center'}}/>
    </View>
    </SafeAreaView>
  )
}