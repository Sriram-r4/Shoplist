import { View, Text,TextInput, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import { DataTable,Surface } from 'react-native-paper'
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { MaterialIcons } from '@expo/vector-icons'

export default function DynamicInputTable(props) {
    const TableData=props.tableData;
    
   let num=0;
    
  return (
    <View>
      <Surface className="bg-white rounded-2xl mt-2">
     <DataTable>
        <DataTable.Header style={{borderBottomColor:"#00695C"}}>
            <DataTable.Title style={{flex:0.3,justifyContent:"space-between"}}>No.</DataTable.Title>
            <DataTable.Title style={{flex:1,justifyContent:"space-between"}}>Item</DataTable.Title>
            <DataTable.Title style={{flex:0.4,justifyContent:"space-around"}}>Status</DataTable.Title>
            <DataTable.Title style={{flex:0.3,justifyContent:"space-around"}}>Qty</DataTable.Title>
            <DataTable.Title style={{flex:0.4,justifyContent:"space-around"}}>Amt</DataTable.Title>
        </DataTable.Header>
        <ScrollView showsVerticalScrollIndicator={false} style={{height:hp(44.8)}}>
        {TableData.sort((a, b) => a.item_id - b.item_id).map((item,num) => (<DataTable.Row style={{borderBottomColor:"#76a89f"}}  key={num}>
        <DataTable.Cell style={{flex:0.3,justifyContent:"space-between"}}>{++num}</DataTable.Cell>
        <DataTable.Cell style={{flex:1,justifyContent:"space-between"}}>{item.itemName}</DataTable.Cell>
        <DataTable.Cell style={{flex:0.4,justifyContent:"space-around"}}>{item.status==="red"?
        "\u{1F534}":(item.status==="green")?"\u{1F7E2}":"\u{1F7E1}"
        }</DataTable.Cell>
        <DataTable.Cell style={{flex:0.3,justifyContent:"space-around"}}>{item.quantity }</DataTable.Cell>
        <DataTable.Cell style={{flex:0.4,justifyContent:"space-around"}}>{item.amount}</DataTable.Cell>
        </DataTable.Row>
        ))}
        </ScrollView>
        {/* <DataTable.Row><Text>End of List</Text></DataTable.Row> */}
     </DataTable>
     </Surface>
    </View>
  )
}
