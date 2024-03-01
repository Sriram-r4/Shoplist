import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { usefirebaseOrderedList } from '../firebase/Ordered_list'
import LottieView from "lottie-react-native"


export default function CategoryItems({ route, navigation }) {
    const selectedCategory = route.params.selectedCategory;

    const [confirmedItems, fetchFinalDataFromFirestore, addFinalDataToFirestore, deleteFinalDocument, updateFinalDocument] = usefirebaseOrderedList();

    useEffect(() => {
        fetchFinalDataFromFirestore()
    }, [])

    function getStatus(status) {
        if (status == "red") { return "text-center text-2xl text-red-400 font-medium m-1"; }
        else if (status == "yellow") { return "text-center text-2xl text-yellow-400 font-medium m-1"; }
        else { return "text-center text-2xl text-green-400 font-medium m-1"; }
    }



    return (
        <SafeAreaView style={{ height: hp(93), width: wp(100) }}>
            <View style={{ height: hp(6), width: wp(97) }} className="self-center bg-emerald-200 rounded-xl flex-row">
                <Text style={{ height: hp(4) ,width:wp(77)}} className="text-teal-700 text-2xl m-2 text-center font-medium">{selectedCategory} </Text>
                <Text style={{ height: hp(5),width:wp(10) }} className="text-white text-2xl m-1 rounded-full bg-teal-600 text-center  font-medium">{confirmedItems.filter(itm => (itm.itemCategory == selectedCategory)).length}</Text>
            </View>
            {confirmedItems.length != 0 ?
                (confirmedItems.filter(itm => (itm.itemCategory == selectedCategory)).length !=0 ?
                    <View style={{ height: hp(85), width: wp(95) }} className=" flex-1 self-center">
                        <FlatList
                            numColumns={2}
                            contentContainerStyle={{ alignSelf: "center" }}
                            data={confirmedItems.filter(itm => (itm.itemCategory == selectedCategory)).sort((a, b) => b.item_id - a.item_id)}
                            renderItem={({ item, index }) => (
                                <Pressable onPress={() => { navigation.navigate("Item", { item: item }) }}>
                                    <View style={{ height: hp(20), width: wp(45) }} key={index} className="p-0.5 m-1 bg-emerald-100 rounded-xl">
                                        <Text className={getStatus(item.status)} >{item.itemName}</Text>
                                        <View style={{ height: hp(14), width: wp(45) }} className=" items-center justify-center flex-row">
                                            <Text style={{ height: hp(7), width: wp(20) }} className="text-lg font-normal flex-col text-center text-teal-700">Quantity {item.quantity}</Text>
                                            <Text style={{ height: hp(7), width: wp(20) }} className="text-lg font-normal flex-col text-center text-teal-700">Amount {item.amount}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    :
                    <View style={{ height: hp(85), width: wp(95) }} className="self-center" >
                        <LottieView source={require("../../assets/EmptyListData.json")} style={{ height:hp(30),width:wp(60),alignSelf:"center" }} autoPlay />
                        <Text style={{ height: hp(15) }} className="text-teal-500 text-2xl font-semibold text-center ">"{selectedCategory}" has no Items. Add Items under this category.</Text>
                    </View>
                    
                    
                )
                :
                <View style={{ height: hp(85), width: wp(95) }} className=" flex-1 items-center justify-center self-center">
                    <LottieView source={require("../../assets/Loading.json")} style={{ height: hp(30), width: wp(60), alignSelf: "center", alignItems: "center" }} autoPlay />
                    <Text style={{ height: hp(6) }} className="text-teal-500 text-2xl font-semibold text-center ">Loading...</Text>
                </View>
                
                }
        </SafeAreaView>

    )
}