import { View, Text,TextInput, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import { DataTable } from 'react-native-paper'
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen'


export default function DynamicInputTable(props) {
    const TableData=props.tableData;
   
    
  return (
    <View>
     <DataTable>
        <DataTable.Header style={{borderBottomColor:"#00695C"}}>
            <DataTable.Title style={{flex:0.2}}>No.</DataTable.Title>
            <DataTable.Title style={{flex:1}}>Item</DataTable.Title>
            <DataTable.Title style={{flex:0.3}}>Qty</DataTable.Title>
            <DataTable.Title style={{flex:0.3}}>Amt(Kg)</DataTable.Title>
        </DataTable.Header>
        <ScrollView showsVerticalScrollIndicator={false} style={{height:hp(44.8)}}>
        {TableData.map((item) => (<DataTable.Row style={{borderBottomColor:"#76a89f"}}  key={item.row_id}>
        <DataTable.Cell style={{flex:0.2}}>{item.row_id}</DataTable.Cell>
        <DataTable.Cell style={{flex:1}}>{item.item_name}</DataTable.Cell>
        <DataTable.Cell style={{flex:0.3}}>{item.quantity}</DataTable.Cell>
        <DataTable.Cell style={{flex:0.3}}>{item.amount}</DataTable.Cell>
        </DataTable.Row>))}
        </ScrollView>
        {/* <DataTable.Row><Text>End of List</Text></DataTable.Row> */}
     </DataTable>
    </View>
  )
}
