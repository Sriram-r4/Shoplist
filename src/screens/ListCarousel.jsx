import { View, Text, FlatList,ScrollView } from 'react-native'
import React, { useEffect,useRef,useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { usefirebaseList } from '../firebase/List'
import { Surface,DataTable, Provider } from 'react-native-paper'

export default function ListCarousel({ route, navigation }) {
    const [ListItemData, setListItemData, fetchListDataFromFirestore, addListDataToFirestore, deleteListDocument, updateListDocument] = usefirebaseList(navigation)

    
    const selectedListItem=route.params.selectedList;
    if(selectedListItem!=undefined){
    console.log("selected List",selectedListItem.listname)}


    

    const ref=useRef(null);
    const [index,setIndex]=useState(0)

   
   
    
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
    
    // useEffect(()=>{
    //     if (ref.current && selectedListItem !== undefined) {
    //         ref.current.scrollToIndex({ index: selectedListItem });
    //       }
    // },[selectedListItem])
    

   
    
    //console.log("Lists in List Carousel",ListItemData)
   

    return (
        <View style={{
            width: wp(100),
            height: hp(93),
        }} className="bg-teal-50/[0.8]  ">
            {ListItemData.length > 0 ?
                <FlatList
                    ref={ref}
                    initialScrollIndex={index}
                    onScrollToIndexFailed={()=>{}}
                    data={ListItemData}
                    horizontal
                    renderItem={({ item,index:i }) => {
                    
                     return(
                        <View style={{ height: hp(89), width: wp(90) }}  className="bg-teal-100 self-center mx-2 my-2 rounded-xl" >
                            <View style={{ height: hp(5), width: wp(90) }} key={item.id}  className="flex-row my-2 justify-around">
                                <Text style={{ height: hp(5), width: wp(70) }} className=" text-xl font-semibold text-teal-800 px-2  py-1">
                                    {item.listname} {i+1}
                                </Text>
                                <View style={{ height: hp(5), width: wp(10) }} className={getStatusClass(item.liststatus)}></View>
                            </View>
                            <View style={{ height: hp(15), width: wp(85) }} className="flex-row justify-around bg-teal-50 self-center rounded-xl m-1">
                                <Text style={{ height: hp(15), width: wp(85) }} className=" text-normal text-teal-800  text-clip px-2  py-0.8">
                                    {item.listdes}
                                </Text>
                            </View>
                            <Surface style={{ height: hp(62), width: wp(85) }} className="bg-teal-50 rounded-xl self-center">
                                <Provider>
                                <DataTable>
                                    <DataTable.Header style={{borderBottomColor: "#76a89f" }}>
                                        <DataTable.Title style={{ flex: 0.3, justifyContent: "space-between" }}>No.</DataTable.Title>
                                        <DataTable.Title style={{ flex: 1, justifyContent: "space-between" }}>Item</DataTable.Title>
                                        <DataTable.Title style={{ flex: 0.4, justifyContent: "space-around" }}>Status</DataTable.Title>
                                        <DataTable.Title style={{ flex: 0.3, justifyContent: "space-around" }}>Qty</DataTable.Title>
                                        <DataTable.Title style={{ flex: 0.4, justifyContent: "space-around" }}>Amt</DataTable.Title>
                                    </DataTable.Header>
                                    <ScrollView showsVerticalScrollIndicator={false} style={{ height: hp(50) }}>
                                        {item.ListItems.map((i,index) => (
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
                        </View>)}}
                    showsHorizontalScrollIndicator={false}
                    
                    snapToInterval={wp(93)}
                    decelerationRate={0}
                    bounces={false}
                /> : <View><Text>no data</Text></View>}
        </View>
    )
}