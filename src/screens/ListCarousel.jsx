import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { usefirebaseList } from '../firebase/List'
import { Surface, DataTable, Provider } from 'react-native-paper'
import { getDateFromTimestamp } from '../firebase/dateConversion'
import LottieView from "lottie-react-native"

export default function ListCarousel({ route, navigation }) {
    const [ListItemData, setListItemData, fetchListDataFromFirestore, addListDataToFirestore, deleteListDocument, updateListDocument] = usefirebaseList(navigation)


    const selectedListItem = route.params;
    

    useEffect(() => {
        fetchListDataFromFirestore()
    }, [route.params])



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


    return (
        <SafeAreaProvider>
        <View style={{
            width: wp(100),
            height: hp(93),
        }} className="bg-teal-50/[0.8]  ">
            {ListItemData.length > 0 ?
                <FlatList
                    initialScrollIndex={selectedListItem.SelectedIndex - 1}
                    data={ListItemData.sort((a, b) => b.list_id - a.list_id)}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    horizontal
                    renderItem={({ item, index: i }) => {
                        return (
                            <View style={{ height: hp(89), width: wp(90) }} className="bg-teal-100 self-center mx-2 my-2 rounded-xl" >
                                <View style={{ height: hp(5), width: wp(90) }} key={item.list_id} className="flex-row my-2 justify-around">
                                    <Text style={{ height: hp(5), width: wp(70) }} className=" text-xl font-semibold text-teal-800 px-2  py-1">
                                        {item.listname} {i + 1}
                                    </Text>
                                    <View style={{ height: hp(5), width: wp(10) }} className={getStatusClass(item.liststatus)}></View>
                                </View>
                                <View style={{ height: hp(15), width: wp(85) }} className="flex-row justify-around bg-teal-50 self-center rounded-xl m-1">
                                    <Text style={{ height: hp(15), width: wp(85) }} className=" text-normal text-teal-800  text-clip px-2  py-0.8">
                                        {item.listdes}
                                    </Text>
                                </View>
                                <Surface style={{ height: hp(58), width: wp(85) }} className="bg-teal-50 rounded-xl self-center">
                                    <Provider>
                                        <DataTable>
                                            <DataTable.Header style={{ borderBottomColor: "#76a89f" }}>
                                                <DataTable.Title style={{ flex: 0.3, justifyContent: "space-between" }}>No.</DataTable.Title>
                                                <DataTable.Title style={{ flex: 1, justifyContent: "space-between" }}>Item</DataTable.Title>
                                                <DataTable.Title style={{ flex: 0.4, justifyContent: "space-around" }}>Status</DataTable.Title>
                                                <DataTable.Title style={{ flex: 0.3, justifyContent: "space-around" }}>Qty</DataTable.Title>
                                                <DataTable.Title style={{ flex: 0.4, justifyContent: "space-around" }}>Amt</DataTable.Title>
                                            </DataTable.Header>
                                            <ScrollView showsVerticalScrollIndicator={false} style={{ height: hp(50) }}>
                                                {item.ListItems.map((i, index) => (
                                                    <DataTable.Row style={{ borderBottomColor: "#76a89f" }} key={index}>
                                                        <DataTable.Cell style={{ flex: 0.3, justifyContent: "space-between" }}>{++index}</DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 1, justifyContent: "space-between" }}>{i.itemName}</DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 0.4, justifyContent: "space-around" }}>{i.status === "red" ?
                                                            "\u{1F534}" : (i.status === "green") ? "\u{1F7E2}" : "\u{1F7E1}"
                                                        }</DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 0.3, justifyContent: "space-around" }}>{i.quantity}</DataTable.Cell>
                                                        <DataTable.Cell style={{ flex: 0.4, justifyContent: "space-around" }}>{i.amount}</DataTable.Cell>
                                                    </DataTable.Row>
                                                ))}


                                            </ScrollView>


                                        </DataTable>
                                    </Provider>
                                </Surface>
                                {item == undefined && item == null ? <View style={{ height: hp(5), width: wp(85) }} className=" justify-around bg-teal-50 self-center rounded-xl m-2"></View> :
                                    <View style={{ height: hp(5), width: wp(85) }} className=" justify-around bg-teal-50 self-center rounded-xl m-2">
                                        {item.UpdatetimeStamp ?
                                            <View>
                                                <Text style={{ height: hp(2.5), width: wp(85) }} className=" text-normal text-center text-teal-800  text-clip px-2  py-0.8">
                                                    Last Updated On:&nbsp;{getDateFromTimestamp(item.timeStamp)}
                                                </Text>
                                                <Text style={{ height: hp(2.5), width: wp(85) }} className=" text-normal text-center text-teal-800  text-clip px-2  py-0.8">
                                                    Created On:&nbsp;{getDateFromTimestamp(item.timeStamp)}
                                                </Text>

                                            </View>
                                            :
                                            <View style={{ height: hp(5), width: wp(85) }} className="p-2">
                                                <Text style={{ height: hp(5), width: wp(85) }} className=" text-normal text-center text-teal-800  text-clip px-2  py-0.8">
                                                    Created On:&nbsp;{getDateFromTimestamp(item.timeStamp)}
                                                </Text>
                                            </View>
                                        }


                                    </View>}
                            </View>)
                    }}
                    showsHorizontalScrollIndicator={false}

                    snapToInterval={wp(93)}
                    decelerationRate={0}
                    bounces={false}
                /> :
                <View style={{ height: hp(93), width: wp(100) }} className=" flex-1 items-center justify-center self-center">
                    <LottieView source={require("../../assets/Loading.json")} style={{ height: hp(30), width: wp(60), alignSelf: "center", alignItems: "center" }} autoPlay />
                    <Text style={{ height: hp(6) }} className="text-teal-500 text-2xl font-semibold text-center ">Loading...</Text>
                </View>}
        </View>
        </SafeAreaProvider>
    )
}