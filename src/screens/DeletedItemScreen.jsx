import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useIsFocused } from '@react-navigation/native';
import { usefirebaseDeletedItem } from '../firebase/deleted_item';
import LottieView from 'lottie-react-native';


export default function DeletedItemScreen({ navigation, route }) {

    const [deletedItems, deleteDeletedItemDocument, addDeletedItemsToFirestore, fetchDeletedItemsFromFirestore, DeleteItemCollection] = usefirebaseDeletedItem(navigation);

    const isFocusedScreen = useIsFocused();

    useEffect(() => {
        fetchDeletedItemsFromFirestore()
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

    const handleItemDelete = (item) => {
        Alert.alert(
            "\u{1F914} Action Required!",
            "Are you sure want to delete the Item?",
            [
                { text: "CANCEL", onPress: () => { } },
                {
                    text: "DELETE", onPress: () => {
                        deleteDeletedItemDocument(item)
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
            {deletedItems.length > 0 ?
                <FlatList
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    data={deletedItems}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { navigation.navigate("Item", { item: item }) }} onLongPress={() => { handleItemDelete(item) }}>

                            <View style={{ height: hp(10), width: wp(95) }} className="bg-teal-100 self-center my-1  rounded-xl" >
                                <View style={{ height: hp(10), width: wp(95) }} className="flex-row">
                                    <View style={{ height: hp(9), width: wp(80) }} key={item.item_id} className=" my-1 justify-around">
                                        <Text style={{ height: hp(5), width: wp(70) }} className=" text-xl font-semibold text-teal-800 px-2  py-1">
                                            {item.itemName}
                                        </Text>
                                        <Text style={{ height: hp(4), width: wp(70) }} className=" text-normal  text-teal-800 text-clip px-2 py-0.8">
                                            {item.itemCategory}
                                        </Text>
                                    </View>
                                    <View style={{ height: hp(5), width: wp(10), alignSelf: "center" }} className={getStatusClass(item.status)}></View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )} />
                :
                <View className="flex-1 self-center"  >
                    <LottieView source={require("../../assets/DeletedList.json")} style={{ height: hp(50), width: wp(90) }} autoSize autoPlay />
                    <View className="self-center items-center justify-center" style={{ height: hp(10), width: wp(95) }}>
                        <Text className="text-teal-700 font-medium text-2xl">No Deleted Items!</Text>
                        <Text className="text-teal-700 font-normal text-lg">Delete Items to view here </Text>
                    </View>
                </View>}


        </SafeAreaView>
    )
}