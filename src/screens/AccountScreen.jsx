import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Divider, FAB, Surface } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

export default function AccountScreen() {

  const [listActive, setListActive] = useState(false);

  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(85),
    }} className="bg-teal-50/[0.8]  ">
      <View style={{ height: hp(20), width: wp(92), alignSelf: "center" }} className="bg-teal-100 flex flex-row m-2 justify-around items-center rounded-xl">
        <View style={{ height: hp(13), width: wp(26) }} className="bg-cyan-100 rounded-full">
          <Image source={require("../../assets/profileImage.png")} style={{ height: hp(13), width: wp(26) }} />
        </View>
        <View style={{ height: hp(13), width: wp(50) }} className="justify-center m-1">
          <View className=" p-1 m-0.5 flex-col" style={{ height: hp(5) }} >
            <Text className="text-teal-700 text-3xl font-semibold ">Sriram</Text>
          </View>
          <View className=" flex-col m-0.5 p-1" style={{ height: hp(5) }}>
            <Text className="text-teal-600 font-medium text-sm">Joined 15th December 2023</Text>
          </View>
        </View>
      </View>
      <Divider />
      <View style={{ height: hp(22), width: wp(90), alignSelf: "center" }} className="bg-teal-100/[0.5] rounded-2xl m-2 p-1 ">
        <View style={{ height: hp(13), width: wp(85), alignSelf: "center" }} className="bg-teal-50/[0.6] flex-row justify-around items-center rounded-2xl m-1">
          <FAB
            icon="format-list-bulleted-square"
            color='#00695c'
            label='List'
            style={{ height: hp(7.6), width: wp(28), alignContent: "space-around", backgroundColor: "#f0fdfa" }}
            className="m-2 justify-center "
            onPress={() => { console.log("List Pressed"); setListActive(true) }
            }
          />
          <FAB
            icon="apps-box"
            color='#00695c'
            label='Items'
            style={{ height: hp(7.6), width: wp(28), alignContent: "space-around", backgroundColor: "#f0fdfa" }}
            className="m-2 justify-center "
            onPress={() => { console.log("Item Pressed"); setListActive(false) }}
          />
        </View>
        <View style={{ height: hp(5.6), width: wp(85), alignSelf: "center" }} className="bg-slate-50  flex-row justify-around items-center rounded-2xl m-1">
          <Surface style={{ height: hp(4), width: wp(20), justifyContent: "space-around" }} className="bg-teal-100 flex-row rounded-xl">
            <View style={{ height: hp(2.5), width: wp(5) }} className="bg-red-400 m-1 p-1  rounded-full "></View>
            <Text className="text-teal-700 font-semibold text-lg  ">
              {listActive === true ? 18 : 21}
            </Text>
          </Surface>
          <Surface style={{ height: hp(4), width: wp(20), justifyContent: "space-around" }} className="bg-teal-100 flex-row rounded-xl">
            <View style={{ height: hp(2.5), width: wp(5) }} className="bg-yellow-400 m-1 p-1  rounded-full "></View>
            <Text className="text-teal-700 font-semibold text-lg  ">
              {listActive === true ? 30 : 17}
            </Text>
          </Surface>
          <Surface style={{ height: hp(4), width: wp(20), justifyContent: "space-around" }} className="bg-teal-100 flex-row rounded-xl">
            <View style={{ height: hp(2.5), width: wp(5) }} className="bg-green-400 m-1 p-1  rounded-full "></View>
            <Text className="text-teal-700 font-semibold text-lg  ">
              {listActive === true ? 16 : 46}
            </Text>
          </Surface>
        </View>
      </View>
      <Divider />
      <View style={{ height: hp(25), width: wp(90), alignSelf: "center" }} className="bg-teal-100/[0.6] m-2 items-center  p-1 rounded-2xl">
        <Text className="text-teal-700 text-xl font-medium m-2 " >Actions</Text>
        <View>
        <TouchableOpacity style={{ height: hp(5), width: wp(85) }} className="flex-row ">
          <MaterialIcons name='edit' size={20} color={"#00695c"} style={{margin:3,padding:1.5}}/>
          <Text className="text-teal-700 text-xl font-medium ml-2 ">Edit Profile</Text>
        </TouchableOpacity>
        <Divider/>
        <TouchableOpacity style={{ height: hp(5), width: wp(85) }} className="flex-row mt-3">
          <MaterialIcons name='share' size={20} color={"#00695c"} style={{margin:3,padding:1.5}}/>
          <Text className="text-teal-700 text-xl font-medium ml-2">Share </Text>
        </TouchableOpacity>
        <Divider/>
        <TouchableOpacity style={{ height: hp(5), width: wp(85) }} className="flex-row mt-3">
          <MaterialIcons name='delete' size={20} color={"#00695c"} style={{margin:3,padding:1.5}}/>
          <Text className="text-teal-700 text-xl font-medium ml-2">Delete Account</Text>
        </TouchableOpacity>
        
        </View>
      </View>
    </SafeAreaView>
  )
}