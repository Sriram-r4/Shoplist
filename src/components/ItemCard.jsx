import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from 'react-native-paper';
import { FlatList } from 'react-native';



export default function ItemCard({ items, showCardMessage}) {

  return (

    <ScrollView style={{ height: hp(33), width: wp(95) }} showsVerticalScrollIndicator={false} className=" m-1.5 self-center">
      <FlatList data={items.sort((a, b) => a.item_id - b.item_id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => showCardMessage(item)}>
            <View style={{ width: wp(30), height: hp(15), alignSelf: 'center' }} key={item.item_id} className='bg-teal-200/[0.2] m-1  rounded-2xl'>
              <Card.Content>

                <Text style={{ height: hp(3.1) }} className=' m-1 text-teal-800 text-lg font-medium text-clip'>{item.itemName}</Text>
                <Text style={{ height: hp(2.2) }} className=' m-1 text-teal-800  font-medium text-clip '>{item.itemCategory}</Text>
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