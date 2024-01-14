import { View, Text,TextInput, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import { DataTable,Surface } from 'react-native-paper'
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen'


export default function DynamicInputTable(props) {
    const TableData=props.tableData;
   
    
  return (
    <View>
      <Surface style={{}} className="bg-white rounded-2xl mt-2">
     <DataTable>
        <DataTable.Header style={{borderBottomColor:"#00695C"}}>
            <DataTable.Title style={{flex:0.3,justifyContent:"space-between"}}>No.</DataTable.Title>
            <DataTable.Title style={{flex:1,justifyContent:"space-between"}}>Item</DataTable.Title>
            <DataTable.Title style={{flex:0.4,justifyContent:"space-around"}}>Qty</DataTable.Title>
            <DataTable.Title style={{flex:0.4,justifyContent:"space-around"}}>Amt(Kg)</DataTable.Title>
        </DataTable.Header>
        <ScrollView showsVerticalScrollIndicator={false} style={{height:hp(44.8)}}>
        {TableData.sort((a, b) => a.item_id - b.item_id).map((item) => (<DataTable.Row style={{borderBottomColor:"#76a89f"}}  key={item.item_id}>
        <DataTable.Cell style={{flex:0.3,justifyContent:"space-between"}}>{item.item_id}</DataTable.Cell>
        <DataTable.Cell style={{flex:1,justifyContent:"space-between"}}>{item.itemName}</DataTable.Cell>
        <DataTable.Cell style={{flex:0.4,justifyContent:"space-around"}}>{item.quantity}</DataTable.Cell>
        <DataTable.Cell style={{flex:0.4,justifyContent:"space-around"}}>{item.amount}</DataTable.Cell>
        </DataTable.Row>))}
        </ScrollView>
        {/* <DataTable.Row><Text>End of List</Text></DataTable.Row> */}
     </DataTable>
     </Surface>
    </View>
  )
}
