import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function DeletedScreen() {
  return (
    <SafeAreaView style={{
        width:wp(100),
        height:hp(85),
      }} className="bg-teal-50/[0.8]  "></SafeAreaView>
  )
}