import { View, Text, Image, ScrollView, FlatList } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import profileImage from '../../assets/profileImage.png'
import { collection, getDocs} from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';
import { useIsFocused } from '@react-navigation/native'


export default function HomeScreen() {
  const [currentItems, setCurrentItems] = useState([])

  const isFocusedScreen=useIsFocused();
     
 

  const list_items = [
    { id: 3, text: 'Item 3' },
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
    { id: 6, text: 'Item 6' },
    { id: 7, text: 'Item 7' },
    { id: 8, text: 'Item 8' },
    { id: 9, text: 'Item 9' },
    { id: 10, text: 'Item 10' },
    { id: 11, text: 'Item 11' },
    { id: 12, text: 'Item 12' },

    // Add more items here...
  ];
  // const hitems = [
  //   { id: 3, text: 'Item 3' },
  //   { id: 1, text: 'Item 1' },
  //   { id: 2, text: 'Item 2' },
  //   { id: 4, text: 'Item 4' },
  //   { id: 5, text: 'Item 5' },
  //   { id: 6, text: 'Item 6' },
  //   { id: 7, text: 'Item 7' },
  //   { id: 8, text: 'Item 8' },
  //   { id: 9, text: 'Item 9' },
  //   { id: 10, text: 'Item 10' },
  //   { id: 11, text: 'Item 11' },
  //   { id: 12, text: 'Item 12' },

  //   // Add more items here...
  // ];

  const fetchDataFromFirestore = () => {
    const collectionRef = collection(FIREBASE_DB, 'item-list');
    getDocs(collectionRef).then((q) => {

      const newData = q.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(newData);
      setCurrentItems(newData);
    });
  };

  useEffect(() => {
    fetchDataFromFirestore();
    console.log("Items from Firestore Database ,called from Home", currentItems)
  }, [isFocusedScreen]);//item_id

 

  const renderItem = ({ item }) => (
    <View style={{ width: wp(90), height: hp(10), alignSelf: 'center' }} key={item.id} className='bg-teal-300/[0.2] flex-row  m-2 rounded-2xl'>
      <View style={{ width: wp(60), height: hp(10) }} >
        <Text style={{ height: hp(4) }} className="text-teal-800 font-medium text-lg mt-2 mx-2">{item.text}</Text>
        <Text style={{ height: hp(3) }} className="text-teal-800 font-normal  mx-2">First Item</Text>
      </View>
      <View style={{ width: wp(15), height: hp(10) }} >
        <Text style={{ width: wp(14), height: hp(6) }} className='text-teal-800 font-normal text-sm text-center p-1 m-2'>Nov 19</Text>
      </View>
      <View style={{ width: wp(15), height: hp(10) }} className='flex justify-center' >
        <View style={{ width: wp(9), height: hp(4.7), aspectRatio: 1 }} className='rounded-full justify-center bg-red-400 m-2 p-1 '></View>
      </View>
    </View>
  );
  // const renderHitem = ({ hitem }) => (
  //   <View style={{ width: wp(50), height: hp(15), alignSelf: 'center' }} key={hitem.id} className='bg-teal-200/[0.2] m-2  rounded-2xl'>
  //     <Text>{hitem.text}</Text>
  //     </View> 
  // );


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
      {currentItems.length!=0?
      <View style={{ width: wp(95), height: hp(22), alignSelf: 'center' }} className='bg-teal-50 m-4 rounded-2xl'>
        <Text style={{ height: hp(4) }} className="text-teal-700 font-medium text-lg mt-2 ml-2 ">Pick up where you left off</Text>
        <ScrollView style={{ width: wp(90), height: hp(15), alignSelf: 'center', }} showsVerticalScrollIndicator={false}>
          <FlatList
            data={currentItems.sort((a, b) => a.item_id - b.item_id)}
            renderItem={({ item }) => (
              <View style={{ width: wp(40), height: hp(13), alignSelf: 'center' }} key={item.id} className='bg-teal-200/[0.2] m-2 p-1 rounded-2xl'>
               {item.status==="green"? <Text style={{ height: hp(3.2) }} className=' mb-1.5 mt-1 mx-2 text-green-600 text-lg font-medium text-ellipsis'>{item.itemName}</Text>
               :(item.status==="red"? <Text style={{ height: hp(3.2) }} className=' mb-1.5 mt-1 mx-2 text-red-600 text-lg font-medium text-ellipsis'>{item.itemName}</Text>
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
      :<View></View>}
      {currentItems.length===0?<View style={{ width: wp(95), height: hp(60), alignSelf: 'center' }} className=' m-2 rounded-2xl'>
        <Text style={{ height: hp(4) }} className='text-teal-900 font-medium  mx-2 mb-1 text-xl'>Your Items</Text>
        <View style={{ height: hp(54), width: wp(95) }} >
          <FlatList style={{ width: wp(93), alignSelf: 'center', }}
            data={list_items}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      :
      <View style={{ width: wp(95), height: hp(60), alignSelf: 'center' }} className='m-0.5 rounded-2xl'>
        <Text style={{ height: hp(4) }} className='text-teal-900 font-medium  mx-2 mb-1 text-xl'>Your Items</Text>
        <View style={{ height: hp(28), width: wp(95) }} >
          <FlatList style={{ width: wp(93), alignSelf: 'center', }}
            data={list_items}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>}
    </SafeAreaView>

  )
}
