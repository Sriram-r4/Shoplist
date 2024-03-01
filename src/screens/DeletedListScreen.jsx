import { View, Text, FlatList, Alert } from 'react-native'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { usefirebaseDeletedList } from '../firebase/deleted_list';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from "lottie-react-native"

export default function DeletedListScreen({ navigation, route }) {

  const [deletedLists, deleteDeletedDocument, addDeletedDataToFirestore, fetchDeletedDataFromFirestore, DeleteCollection] = usefirebaseDeletedList(navigation);

  const isFocusedScreen = useIsFocused();

  useEffect(() => {
    fetchDeletedDataFromFirestore()
  }, [isFocusedScreen])

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

  const handleListDelete = (item) => {
    console.log(item)
    Alert.alert(
      "\u{1F914} Action Required!",
      "Are you sure want to delete the List?",
      [
        { text: "CANCEL", onPress: () => { } },
        {
          text: "DELETE", onPress: () => {
            deleteDeletedDocument(item)
          }
        },
      ]
    )

  }

  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(71),
    }} className="bg-teal-50/[0.8]  ">
      {deletedLists.length > 0 ?
        <FlatList
          initialNumToRender={7}
          maxToRenderPerBatch={6}
          data={deletedLists}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ListDetailScreen", { item: item })
              }}
              onLongPress={() => { handleListDelete(item) }}>
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
          )} />
        :
        <View className="flex-1 self-center"  >
          <LottieView source={require("../../assets/DeletedList.json")} style={{ height: hp(50), width: wp(90) }} autoSize autoPlay />
          <View className="self-center items-center justify-center" style={{ height: hp(10), width: wp(95) }}>
            <Text className="text-teal-700 font-medium text-2xl">No Deleted Lists!</Text>
            <Text className="text-teal-700 font-normal text-lg">Delete Lists to view here </Text>
          </View>
        </View>

      }
    </SafeAreaView>
  )
}