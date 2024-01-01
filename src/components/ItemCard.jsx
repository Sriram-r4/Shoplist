import { View,ScrollView,Text } from 'react-native'
import React, { useState} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from 'react-native-paper';
import { FlatList } from 'react-native';
import Product_Data from '../constants/Product_Data.json'


export default function ItemCard() {

  return (
    <ScrollView style={{height:hp(19),width:wp(100)}} showsVerticalScrollIndicator={false} className=" m-2 self-center">
      <FlatList data={Product_Data}
            renderItem={({ item }) => (
              <View style={{ width: wp(30), height: hp(15), alignSelf: 'center' }} key={item.item_id} className='bg-teal-200/[0.2] m-2  rounded-2xl'>
                <Card.Content>
                <Text style={{ height: hp(3.5) }} className=' m-1 text-teal-800 text-lg font-medium '>{item.item_name}</Text>
                <Text style={{ height: hp(2.3) }} className='m-1   text-teal-800'>Qty:&nbsp;{item.quantity}</Text>
                <Text style={{ height: hp(2) }} className='m-1   text-teal-800'>Amt:&nbsp;{item.amount}</Text>
                </Card.Content>
              </View>
            )
            }
            horizontal
            showsHorizontalScrollIndicator={false}/>
    </ScrollView>
  )
}