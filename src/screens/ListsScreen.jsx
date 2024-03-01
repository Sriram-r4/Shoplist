import { View, Text,FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { usefirebaseList } from '../firebase/List'
import { useIsFocused } from '@react-navigation/native'
import { usefirebaseDeletedList } from '../firebase/deleted_list'
import LottieView from 'lottie-react-native';
// import { Skeleton } from 'moti/skeleton'

export default function ListsScreen({ route, navigation }) {

  const [ListItemData, setListItemData, fetchListDataFromFirestore, addListDataToFirestore, deleteListDocument, updateListDocument] = usefirebaseList(navigation)

  const [deletedItems, deleteDeletedDocument, addDeletedDataToFirestore, fetchDeletedDataFromFirestore, DeleteCollection] = usefirebaseDeletedList(navigation)

  // const [showSkeleton, setShowSkeleton] = useState(false);
  const isFocusedScreen = useIsFocused();

  useEffect(() => {
    fetchListDataFromFirestore()

  }, [isFocusedScreen])


  useEffect(() => {
    fetchListDataFromFirestore()

  }, [ListItemData])



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



  const handleLongPress = (item) => {
    Alert.alert(
      '\u{1F914} List Action?',
      'Choose What to do with the selected List',
      [
        { text: 'CANCEL', onPress: () => { { } } },
        {
          text: 'DELETE', onPress: () => {
            {
              addDeletedDataToFirestore(item)
              deleteListDocument(item)
            }
          }
        },
        {
          text: 'UPDATE', onPress: () => {
            {
              navigation.navigate("UpdateListScreen", { updateList: item })
            }
          }
        },
      ],

    );
  }

  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(85),
    }} className="bg-teal-50/[0.8]">
      <Text style={{ height: hp(6), width: wp(95) }} className="text-2xl p-1.5 text-center self-center rounded-xl text-teal-700 font-medium bg-emerald-100  m-2">Your Lists</Text>
      {(ListItemData != undefined && ListItemData != null) && ListItemData.length != 0 ?
        (ListItemData.length > 0 ?
          <FlatList
            data={ListItemData.sort((a, b) => b.list_id - a.list_id)}

            renderItem={({ item, index: i }) => (


              <TouchableOpacity onPress={() => {
                navigation.navigate("ListCarousel", { SelectedIndex: i + 1 })
              }}
                onLongPress={() => { handleLongPress(item) }}>

                <View style={{ height: hp(13), width: wp(95) }} className="bg-teal-100 self-center my-2  rounded-xl" >


                  <View style={{ height: hp(5), width: wp(95) }} key={item.list_id} className="flex-row my-2 justify-around">
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
              // <Skeleton show width={wp(95)} height={hp(13)} colorMode='light' colors={["#B2DFDB", "#F0FDFA", "#B2DFDB"]} transition={{ type: "timing", duration: 2000 }}>
              // </Skeleton>

            )
            }
            showsVerticalScrollIndicator={false} />
          :
          <View style={{ height: hp(85), width: wp(95) }} className=" flex-1 items-center justify-center self-center">
            <LottieView source={require("../../assets/Loading.json")} style={{ height: hp(30), width: wp(60), alignSelf: "center", alignItems: "center" }} autoPlay />
            <Text style={{ height: hp(6) }} className="text-teal-500 text-2xl font-semibold text-center ">Loading...</Text>
          </View>
        )
        :
        <View className="flex-1" >
          <LottieView source={require("../../assets/EmptyListScreen.json")} autoSize autoPlay />
          <View className="self-center items-center justify-center" style={{ height: hp(10), width: wp(95) }}>
            <Text className="text-teal-700 font-medium text-2xl">List is Empty!</Text>
            <Text className="text-teal-700 font-normal text-lg">Add Lists to view here </Text>
          </View>
        </View>}

    </SafeAreaView>
  )
}