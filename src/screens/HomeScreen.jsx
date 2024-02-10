import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import profileImage from '../../assets/profileImage.png'
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import { useIsFocused } from '@react-navigation/native'
import { usefirebaseOrderedList } from '../firebase/Ordered_list';
import { getDayFromDateTimestamp } from '../firebase/dateConversion'
import { MaterialIcons } from '@expo/vector-icons'
import LottieView from "lottie-react-native"

export default function HomeScreen({ navigation,route }) {
  const [currentItems, setCurrentItems] = useState([])

  const isFocusedScreen = useIsFocused();

  const [confirmedItems, fetchFinalDataFromFirestore, addFinalDataToFirestore, deleteFinalDocument, updateFinalDocument] = usefirebaseOrderedList();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    fetchFinalDataFromFirestore();
  }, [isFocusedScreen])



  const fetchDataFromFirestore = () => {
    const collectionRef = collection(FIREBASE_DB, 'item-list');
    getDocs(collectionRef).then((q) => {

      const newData = q.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCurrentItems(newData);
    });
  };

  useEffect(() => {
    fetchDataFromFirestore();
    setSelectedItems([]);
  }, [isFocusedScreen]);

  
  function getStatusClass(status) {
    if (status == "red") {
      return 'rounded-full justify-center bg-red-400 m-2 p-1 ';
    }
    else if (status == "green") {
      return 'rounded-full justify-center bg-green-400 m-2 p-1 '
    }
    else {
      return 'rounded-full justify-center bg-yellow-400 m-2 p-1 '
    }
  }

  const handleLongPress = (item) => {


    const list = selectedItems.filter(i => item.itemName === i.itemName)

    if (list.length === 0) {
      setSelectedItems([...selectedItems, item])
    }

  };


  const deselectItems = () => { setSelectedItems([]) }


  const renderConfirmedItem = ({ item }) => {
    let isSelected = selectedItems.some(i => i.itemName === item.itemName);

    return (
      <TouchableOpacity onPress={() => {
        if (selectedItems.length !== 0) {
          deselectItems()

        }
        else {
          navigation.navigate("Item", { item })
        }
      }} onLongPress={() => handleLongPress(item)}>
        <View style={{ width: wp(90), height: hp(10), alignSelf: 'center' }} key={item.item_id} className='bg-teal-300/[0.2] flex-row  m-2 rounded-2xl'>
          <View style={{ width: wp(60), height: hp(10) }} className="flex-row">
            {isSelected === true ? <MaterialIcons name="check-circle-outline" style={{ alignSelf: "center", paddingHorizontal: 6 }} color={"#00695C"} size={30} /> : <View />}
            <View>
              <Text style={{ height: hp(4) }} className="text-teal-800 font-medium text-lg mt-2 mx-2">{item.itemName}</Text>
              <Text style={{ height: hp(3) }} className="text-teal-800 font-normal  mx-2">{item.itemCategory}</Text>
            </View>
          </View>
          <View style={{ width: wp(15), height: hp(10) }} >
            <Text style={{ width: wp(14), height: hp(6) }} className='text-teal-800 font-normal text-sm text-center p-1 m-2'>{getDayFromDateTimestamp(item.timeStamp)}</Text>
          </View>
          <View style={{ width: wp(15), height: hp(10) }} className='flex justify-center' >
            <View style={{ width: wp(9), height: hp(4.7), aspectRatio: 1 }} className={getStatusClass(item.status)}></View>
          </View>
        </View>

      </TouchableOpacity>)
  }



  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(85),
    }}
      className="bg-teal-50/[0.8]">
      <View style={{ width: wp(95), height: (150), alignSelf: "center", }} className=" rounded-2xl flex  flex-row bg-teal-100/[0.5] " >
        <View style={{ width: wp(55), height: hp(19.5) }} className="justify-center">
          <Text style={{ height: hp(5) }} className="text-teal-700 text-2xl font-semibold px-4 pt-2">Welcome</Text>
          <Text style={{ height: hp(5) }} className="text-teal-900  text-3xl font-bold px-4 pt-1">Sriram !</Text>
          <Text style={{ height: hp(4) }} className="text-teal-600 font-normal px-4 pt-1">It is great to have you here</Text>
        </View>
        <View style={{ width: wp(40), height: hp(19.5) }} className="flex justify-center">
          <Image source={profileImage} alt='profile' style={{ width: wp(36), height: hp(18.2), resizeMode: 'cover' }} className='rounded-2xl   p-1' />
        </View>
      </View>
      {currentItems.length != 0 ?
        <View style={{ width: wp(95), height: hp(22), alignSelf: 'center' }} className='bg-teal-50 m-4 rounded-2xl'>
          <Text style={{ height: hp(4) }} className="text-teal-700 font-medium text-lg mt-2 ml-2 ">Pick up where you left off</Text>
          <ScrollView style={{ width: wp(90), height: hp(15), alignSelf: 'center', }} showsVerticalScrollIndicator={false}>
            <FlatList
              data={currentItems.sort((a, b) => a.item_id - b.item_id)}
              renderItem={({ item }) => (
                <View style={{ width: wp(40), height: hp(13), alignSelf: 'center' }} key={item.id} className='bg-teal-200/[0.2] m-2 p-1 rounded-2xl'>
                  {item.status === "green" ? <Text style={{ height: hp(3.2) }} className=' mb-1.5 mt-1 mx-2 text-green-600 text-lg font-medium text-ellipsis'>{item.itemName}</Text>
                    : (item.status === "red" ? <Text style={{ height: hp(3.2) }} className=' mb-1.5 mt-1 mx-2 text-red-600 text-lg font-medium text-ellipsis'>{item.itemName}</Text>
                      : <Text style={{ height: hp(3.2) }} className=' mb-1.5 mt-1 mx-2 text-yellow-600 text-lg font-medium text-ellipsis'>{item.itemName}</Text>)}
                  <Text style={{ height: hp(2) }} className='mb-2 mx-2 text-teal-600  font-medium text-clip '>{item.itemCategory}</Text>
                  <View style={{ height: hp(2.5) }} className="flex-row">
                    <Text style={{ height: hp(2.3) }} className=' mb-1 mx-2 text-teal-800'>Qty:&nbsp;{item.quantity}</Text>
                    <Text style={{ height: hp(2.3) }} className='mb-1 mx-2 text-teal-800'>Amt:&nbsp;{item.amount}</Text>
                  </View>
                </View>
              )
              }
              horizontal
              showsHorizontalScrollIndicator={false}

            />
          </ScrollView>
        </View>
        : <View></View>}
      <View style={{ width: wp(95), height: hp(60), alignSelf: 'center' }} className=' m-2 rounded-2xl'>
        <View className="flex-row justify-between">
          <Pressable onPress={()=>{navigation.navigate("ItemsScreen")}}>
          <Text style={{ height: hp(4) }} className='text-teal-900 font-medium  mx-2 mb-1 text-xl'>Your Items</Text>
          </Pressable>
          {selectedItems.length !== 0 &&
            <Pressable style={{ backgroundColor: "#00695C", borderRadius: 10, width: wp(20), height: hp(4), marginRight: 10 }}
              onPress={() => { 
              navigation.navigate("List",{listItems:selectedItems})
            }}>
              <Text className="text-white text-center  text-lg">Confirm</Text>
            </Pressable>}
        </View>
        {confirmedItems.length>0?
        <View style={currentItems.length === 0 ? ({ height: hp(54), width: wp(95) }) : ({ height: hp(28), width: wp(95) })} >
          <FlatList style={{ width: wp(93), alignSelf: 'center', }}
            data={confirmedItems}
            renderItem={renderConfirmedItem}
            extraData={selectedItems}
            showsVerticalScrollIndicator={false}
          />
        </View>
        :
      
        <View className="flex-1 " >
          <LottieView source={require("../../assets/EmptyListData.json")} className="self-center" style={{height:hp(40),width:wp(95)}} autoSize   autoPlay />
          <View className="self-center items-center justify-center" style={{height:hp(10),width:wp(95)}}>
          <Text className="text-teal-700 font-medium text-2xl">No Items!</Text>
          <Text  className="text-teal-700 font-normal text-lg">Add Items to view here </Text>
          </View>
        </View>
      
        }
      </View>
    </SafeAreaView>

  )
}
