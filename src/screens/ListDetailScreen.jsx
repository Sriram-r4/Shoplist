import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Surface,DataTable,Provider } from 'react-native-paper'
import { getDateFromTimestamp } from '../firebase/dateConversion'

export default function ListDetailScreen({route,navigation}) {
    const deletedList=route.params.item;

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
        <SafeAreaView style={{ height: hp(93), width: wp(100) }} className="bg-teal-100/[0.2] ">
            <View style={{ height: hp(86), width: wp(90) }} className="bg-teal-100 self-center mx-2 my-2 rounded-xl" >
                <View style={{ height: hp(5), width: wp(90) }} key={deletedList.list_id} className="flex-row my-2 justify-around">
                    <Text style={{ height: hp(5), width: wp(70) }} className=" text-xl font-semibold text-teal-800 px-2  py-1">
                        {deletedList.listname} 
                    </Text>
                    <View style={{ height: hp(5), width: wp(10) }} className={getStatusClass(deletedList.liststatus)}></View>
                </View>
                <View style={{ height: hp(15), width: wp(85) }} className="flex-row justify-around bg-teal-50 self-center rounded-xl m-1">
                    <Text style={{ height: hp(15), width: wp(85) }} className=" text-normal text-teal-800  text-clip px-2  py-0.8">
                        {deletedList.listdes}
                    </Text>
                </View>
                <Surface style={{ height: hp(55), width: wp(85) }} className="bg-teal-50 rounded-xl self-center">
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
                                {deletedList.ListItems.map((i, index) => (
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
                <View style={{ height: hp(5), width: wp(85) }} className=" justify-around bg-teal-50 self-center rounded-xl m-2">
                    {deletedList.UpdatetimeStamp ?
                        <Text style={{ height: hp(2.5), width: wp(85) }} className=" text-normal text-center text-teal-800  text-clip px-2  py-0.8">
                            Last Updated On:&nbsp;{getDateFromTimestamp(deletedList.timeStamp)}
                        </Text> : <Text></Text>}
                    <Text style={{ height: hp(2.5), width: wp(85) }} className=" text-normal text-center text-teal-800  text-clip px-2  py-0.8">
                        Created On:&nbsp;{getDateFromTimestamp(deletedList.timeStamp)}
                    </Text>

                </View>
            </View>
        </SafeAreaView>
    )
}