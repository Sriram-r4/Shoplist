import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Surface, Divider } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { getDateFromTimestamp } from '../firebase/dateConversion'
import { usefirebaseOrderedList } from '../firebase/Ordered_list'
import { usefirebaseDeletedItem } from '../firebase/deleted_item'

export default function ItemScreen({ navigation, route }) {
  const itemInfo = route.params.item

  const [confirmedItems, fetchFinalDataFromFirestore, addFinalDataToFirestore, deleteFinalDocument, updateFinalDocument] = usefirebaseOrderedList(navigation);

  const [deletedItems, deleteDeletedItemDocument, addDeletedItemsToFirestore, fetchDeletedItemsFromFirestore, DeleteItemCollection] = usefirebaseDeletedItem(navigation);

  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(93),
    }} className="bg-teal-50/[0.8]">
      <View style={{ height: hp(6), width: wp(95) }} className="bg-emerald-100 self-center rounded-2xl">
        <Text className="text-teal-700 text-xl text-center font-semibold m-2">Item Information</Text>
      </View>
      <Surface style={{ height: hp(23), width: wp(90) }} className="bg-slate-50 rounded-xl self-center m-4">
        <View style={{ height: hp(11) }} className="p-2">
          <Text className="text-2xl text-teal-700 font-semibold m-0.5">{itemInfo.itemName}</Text>
          <Text className="text-xl text-teal-700 m-0.5">{itemInfo.itemCategory}</Text>
        </View>
        <Divider />
        <View style={{ height: hp(12) }} className=" flex-row ">
          <View style={{ width: wp(30) }} className="border py-6  border-r border-l-0 border-t-0 border-b-0 border-slate-200">
            <Text className="text-md text-teal-700 font-semibold text-center ">Quantity</Text>
            <Text className="text-teal-700 text-center ">{itemInfo.quantity}</Text>
          </View>
          <View style={{ width: wp(30) }} className="border py-6 border-r border-l-0 border-t-0 border-b-0 border-slate-200">
            <Text className="text-md text-teal-700 font-semibold text-center">Amount</Text>
            <Text className="text-teal-700 text-center">{itemInfo.amount}</Text>
          </View>
          <View style={{ width: wp(30) }}>
            <View style={{ height: hp(6), width: wp(12), }} className={itemInfo.status === "red" ? "bg-red-400 self-center my-5 rounded-full"
              : (itemInfo.status === "green" ? "bg-green-400 self-center my-5 rounded-full" : "bg-yellow-400 self-center my-5 rounded-full")}></View>
          </View>
        </View>
      </Surface>
      {itemInfo.deletedTimeStamp ? 
      <View style={{height:hp(10),width:wp(90)}} className="bg-teal-100/[0.6] self-center justify-center rounded-2xl my-5 ">
          <Text className="text-center p-1 text-teal-700 ">Item Created on:&nbsp;{getDateFromTimestamp(itemInfo.timeStamp)}</Text>
          <Text className="text-center p-1 text-teal-700 ">Item Deleted on:&nbsp;{getDateFromTimestamp(itemInfo.deletedTimeStamp)}</Text>
          
      </View> :
        <View className="bg-teal-100/[0.6] self-center justify-between rounded-2xl my-5 px-2 py-4" style={{ height: hp(22), width: wp(90) }}>
          <View>
            <TouchableOpacity className="flex-row mx-4 my-2 pb-2" onPress={() => {

              navigation.navigate("Update", { item: itemInfo, previousScreen: true })
            }}>
              <MaterialIcons name='update' color={"#00695c"} size={25} />
              <Text className="text-teal-700 font-semibold text-xl ml-2">Update</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity className="flex-row mx-4 my-2 pb-2" onPress={() => {
              addDeletedItemsToFirestore(itemInfo)
              deleteFinalDocument(itemInfo)
            }}>
              <MaterialIcons name='delete' color={"#00695c"} size={25} />
              <Text className="text-teal-700 font-semibold text-xl ml-2">Delete</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-teal-700">Item Created on: {getDateFromTimestamp(itemInfo.timeStamp)}</Text>
            {itemInfo.updateTimeStamp?<Text className="text-center text-teal-700">Last Update on : {getDateFromTimestamp(itemInfo.updateTimeStamp)}</Text>:<Text></Text>}
          </View>
        </View>}
    </SafeAreaView>
  )
}