import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from 'react-native-paper';
import { FlatList } from 'react-native';



export default function ItemCard({ items, showCardMessage, deleteDocument,  navigation }) {

  let num = 0;
  
  const handleUpdate = (item) => {
    navigation.navigate("Update", { item })
  }
 


  const handleItemLongPress = (item) => {
    Alert.alert(
      '\u{1F914} Item Action?',
      'Choose What to do with the selected Item',
      [
        { text: 'CANCEL', onPress: () => { { } } },
        { text: 'DELETE', onPress: () => {{deleteDocument(item)}}},
        { text: 'UPDATE', onPress: () => {{handleUpdate(item) }} },
      ],

    );
  }

  return (

    <ScrollView style={{ height: hp(33), width: wp(95) }} showsVerticalScrollIndicator={false} className=" m-1.5 self-center">
      <FlatList data={items.sort((a, b) => a.item_id - b.item_id)}
        renderItem={({ item, num }) => (
          <TouchableOpacity onPress={() => showCardMessage(item)} onLongPress={() => handleItemLongPress(item)}>
            <View style={{ width: wp(30), height: hp(15), alignSelf: 'center' }} key={num + 1} className='bg-teal-200/[0.2] m-1  rounded-2xl'>
              <Card.Content>
                {item.status==="green"?  
                <Text style={{ height: hp(3.2) }} className=' m-1 text-green-600 text-lg font-medium text-clip'>{item.itemName}</Text>
                :(item.status==="red"?<Text style={{ height: hp(3.2) }} className=' m-1 text-red-600 text-lg font-medium text-clip'>{item.itemName}</Text>
                :<Text style={{ height: hp(3.2) }} className=' m-1 text-yellow-600 text-lg font-medium text-clip'>{item.itemName}</Text>)}
                <Text style={{ height: hp(2.2) }} className=' m-1 text-teal-600  font-medium text-clip '>{item.itemCategory}</Text>
                <Text style={{ height: hp(2.3) }} className='m-1   text-teal-800'>Qty:&nbsp;{item.quantity}</Text>
                <Text style={{ height: hp(2) }} className='m-1   text-teal-800'>Amt:&nbsp;{item.amount}</Text>
              </Card.Content>
            </View>
          </TouchableOpacity>
        )
        }

        horizontal
        showsHorizontalScrollIndicator={false} />


    </ScrollView>
  )

}