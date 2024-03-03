import { View, Text, Button, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Surface, Divider } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { getDateFromTimestamp, getDayFromDateTimestamp } from '../firebase/dateConversion'
import { usefirebaseOrderedList } from '../firebase/Ordered_list'
import { usefirebaseDeletedItem } from '../firebase/deleted_item'
import Timeline from 'react-native-timeline-flatlist'
import LottieView from 'lottie-react-native'

export default function ItemScreen({ navigation, route }) {
  const itemInfo = route.params.item

  const [confirmedItems, fetchFinalDataFromFirestore, addFinalDataToFirestore, deleteFinalDocument, updateFinalDocument] = usefirebaseOrderedList(navigation);

  const [deletedItems, deleteDeletedItemDocument, addDeletedItemsToFirestore, fetchDeletedItemsFromFirestore, DeleteItemCollection] = usefirebaseDeletedItem(navigation);

  
  const [ItemCreated, setItemCreated] = useState(getMonthDate(itemInfo.timeStamp));
  const [ItemLastUpdate, setItemLastUpdate] = useState("Jun 1" || getMonthDate(itemInfo.updateTimeStamp));
  const [ItemDeleted, setItemDeleted] = useState("Dec 31" || getMonthDate(itemInfo.deletedTimeStamp));

  if (itemInfo.deletedTimeStamp) {
    useEffect(() => {
      if (itemInfo.updateTimeStamp) {

        setItemLastUpdate(getMonthDate(itemInfo.updateTimeStamp))
      }
      setItemDeleted(getMonthDate(itemInfo.deletedTimeStamp))

    }, [itemInfo])
  }

  

  function getMonthDate(timestamp) {
    const combinedTimestamp = timestamp.seconds + timestamp.nanoseconds / 1e9;


    const date = new Date(combinedTimestamp * 1000);


    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();


    const formattedDate = `${month.substring(0, 3)} ${day}`;

    return formattedDate;
  }





  const Timedata = [
    {
      time: ItemCreated,//"Feb 1",//getMonthDate(itemInfo.timeStamp),
      title: 'Created',
      description: 'It all started from here!'
    },
    {
      time: ItemLastUpdate,//"Feb 21",//getMonthDate(itemInfo.updateTimeStamp),
      title: 'Last Update',
      description: 'Your modification to the item '
    },
    {
      time: ItemDeleted,//"Feb 26",//getMonthDate(itemInfo.deletedTimeStamp),
      title: 'Deleted',
      description: 'Finally, It came to an end'
    }
  ]
  const TimedataWithoutUpdate = [
    {
      time: ItemCreated,//"Feb 1",//getMonthDate(itemInfo.timeStamp),
      title: 'Created',
      description: 'It all started from here!'
    },
    {
      time: ItemDeleted,//"Feb 26",//getMonthDate(itemInfo.deletedTimeStamp),
      title: 'Deleted',
      description: 'Finally, It came to an end'
    }
  ]




  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(93),
    }} className="bg-teal-50/[0.8]">
      {itemInfo != undefined ?
        <>
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

          {itemInfo.deletedTimeStamp ? ((itemInfo == undefined) ?
            <View>
              <LottieView source={require("../../assets/Loading.json")} style={{ height: hp(30), width: hp(60) }} autoPlay />
            </View>
            :
            <View style={itemInfo.updateTimeStamp ? { height: hp(33), width: wp(90) } : { height: hp(24), width: wp(90) }} className="bg-teal-100/[0.6] self-center py-2 px-1  rounded-2xl my-5 ">

              <Timeline
                data={itemInfo.updateTimeStamp ? Timedata : TimedataWithoutUpdate}
                circleSize={20}
                circleColor='#009688'
                lineColor='#009688'
                timeContainerStyle={{ minWidth: 72, marginTop: -5 }}
                timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
                descriptionStyle={{ color: 'gray' }}
                options={{
                  style: { padding: 5 }
                }}
                
                innerCircle={'dot'}
                listViewContainerStyle={{ justifyContent: "center", padding: 5, margin: 5 }}
              />
            </View>
          )
            :
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
                {itemInfo.updateTimeStamp ? <Text className="text-center text-teal-700">Last Update on : {getDateFromTimestamp(itemInfo.updateTimeStamp)}</Text> : <Text></Text>}
              </View>
            </View>}
        </>
        :
        <View style={{ height: hp(80), width: wp(93) }}>
          <LottieView source={require("../../assets/Loading.json")} style={{ height: hp(30), width: hp(60) }} autoPlay />
        </View>
      }
    </SafeAreaView>
  )
}