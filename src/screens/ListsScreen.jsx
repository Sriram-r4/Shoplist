import { View, Text, Image, ScrollView, FlatList, TouchableOpacity,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { usefirebaseList } from '../firebase/List'


export default function ListsScreen({ route, navigation }) {

  const [ListItemData, setListItemData, fetchListDataFromFirestore, addListDataToFirestore, deleteListDocument, updateListDocument] = usefirebaseList(navigation)

  
  
  useEffect(() => {
    fetchListDataFromFirestore()
  }, [route.params])
 
  const [selectedList,setSelectedList]=useState({})
  

  

  function getStatusClass(status) {
    if (status == "red") {
      return "bg-red-400 rounded-full";
    }
    else if (status == "green") {
      return "bg-green-400 rounded-full"
    }
    else {
      return "bg-yellow-400 rounded-full"
    }
  }
 
 

  const handleLongPress=(item)=>{
    Alert.alert(
      '\u{1F914} List Action?',
      'Choose What to do with the selected List',
      [
        { text: 'CANCEL', onPress: () => { { } } },
        { text: 'DELETE', onPress: () => {{
          deleteListDocument(item)
        }}},
        { text: 'UPDATE', onPress: () => {{
            navigation.navigate("UpdateListScreen",{updateList:item})
        }} },
      ],

    );
  }

  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(85),
    }} className="bg-teal-50/[0.8]">
      {ListItemData.length > 0 ?
        <FlatList
          data={ListItemData}
          
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{
              setSelectedList(item);
              console.log("selected List",selectedList)
              navigation.navigate("ListCarousel",{selectedList:selectedList})
              }}
              onLongPress={()=>{handleLongPress(item)}}>
            <View style={{ height: hp(13), width: wp(95) }} className="bg-teal-100 self-center my-2  rounded-xl" >
              <View style={{ height: hp(5), width: wp(95) }} key={item.id} className="flex-row my-2 justify-around">
                <Text style={{ height: hp(5), width: wp(70) }} className=" text-xl font-semibold text-teal-800 px-2  py-1">
                  {item.listname}
                </Text>
                <View style={{ height: hp(5), width: wp(10) }} className={getStatusClass(item.liststatus)}></View>
              </View>
              <View style={{ height: hp(5), width: wp(95) }} className="flex-row mx-2 justify-around">
                <Text style={{ height: hp(5), width: wp(90) }} className=" text-normal text-teal-800 text-clip px-2 py-0.8">
                  {item.listdes}
                </Text>
              </View>
            </View>
            </TouchableOpacity>
          )
          }
          showsVerticalScrollIndicator={false} />
        : <View />}

    </SafeAreaView>
  )
}