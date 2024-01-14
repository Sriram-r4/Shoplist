import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput } from 'react-native';
import { Surface, Button } from 'react-native-paper';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';



export default function MultiInputTable({ navigation, itemData, itemname, handleItemData }) {

  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(1);
  const { selectedItem } = itemname;

  useEffect(() => {
    itemData({ quantity, amount });

  }, [quantity, amount]);

  useEffect(() => {
    if (selectedItem != undefined) {
      // console.log(selectedItem.english)
      setItemName(selectedItem.english);
      setItemCategory(selectedItem.category);
    }

  }, [itemname])

  return (
    <View>
      <Surface style={{ width: wp(95) }} className="self-center p-1 my-4 mx-2 bg-gray-50  rounded-lg">
        <View style={{ width: wp(93) }} className='flex p-1 items-center border-teal-700 rounded'>
          <View style={{ width: wp(90), height: hp(6), borderBottomWidth: 0.3, borderBottomColor: "#00897B" }} className='rounded p-1'>
            <TouchableOpacity className='flex-row justify-between '  onPress={() => { navigation.navigate('Items') }}>
              <Text className='text-xl  p-1 text-teal-700 font-normal  '>Select Item</Text>
              <View style={{ height: hp(5) }} className='p-1  items-center flex  flex-row  '>
                <Text className='text-lg  pb-0.7 text-teal-700 font-semibold '>{itemName == "" ? "" : itemName}</Text>
                <MaterialIcons style={{ color: "#00897B" }} size={30} name='chevron-right' />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: wp(90), height: hp(6), borderBottomWidth: 0.3, borderBottomColor: "#00897B" }} className='rounded justify-between p-1 flex flex-row'>
            <Text className='text-xl text-teal-700 font-normal p-1'>Quantity</Text>
            <View className='flex-row'>
              <View className='p-1'>
                <TouchableOpacity onPress={() => { (quantity > 0) ? setQuantity(quantity + 1) : "1" }}>
                  <AntDesign style={{ color: "#00897B" }} name='plussquare' size={30} />
                </TouchableOpacity>
              </View>
              <View className='p-1' style={{ height: hp(5), width: wp(16) }} >
                <TextInput value={
                  quantity.toString()} onChangeText={(qty) => {
                    if (parseInt(qty) >= 1) {
                      setQuantity(parseInt(qty))
                    }
                    else {
                      setQuantity(1);
                    }

                  }} inputMode='numeric' className='text-xl p-1 border border-teal-700 rounded text-teal-700 font-bold' /></View>
              <View className='p-1'><TouchableOpacity onPress={() => { (quantity > 1) ? setQuantity(quantity - 1) : "1" }}>
                <AntDesign style={{ color: "#00897B" }} name='minussquare' size={30} />
              </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ width: wp(90), height: hp(6), borderBottomWidth: 0.3, borderBottomColor: "#00897B" }} className='rounded justify-between  p-1 flex flex-row'>
            <Text className='text-xl text-teal-700 font-normal p-1'>Amount</Text>
            <View className='flex-row'>
              <View className='p-1'>
                <TouchableOpacity onPress={() => { setAmount(amount + 1) }}>
                  <AntDesign style={{ color: "#00897B" }} name='plussquare' size={30} />
                </TouchableOpacity>
              </View>
              <View className='p-1' style={{ height: hp(5), width: wp(16) }} >
                <TextInput value={amount.toString()}
                  onChangeText={
                    (amt) => {
                      if (parseInt(amt) >= 1) {
                        setAmount(parseInt(amt))
                      }
                      else {
                        setAmount(1);
                      }
                    }
                  }
                  inputMode='numeric' className='text-xl p-1 border border-teal-700 rounded text-teal-700 font-bold' /></View>
              <View className='p-1'>
                <TouchableOpacity onPress={() => { (amount > 1) ? setAmount(amount - 1) : "1" }}>
                  <AntDesign style={{ color: "#00897B" }} name='minussquare' size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ width: wp(90), height: hp(6) }} className='rounded justify-between  p-1 flex flex-row'>
            <Text className='text-xl text-teal-700 font-normal p-1'>Status</Text>
            <View className='flex-row'>
              
             
              
            </View>
          </View>
        </View>

      </Surface>
      <Button style={{ width: wp(90), height: hp(5)}}
        title="Add Item" labelStyle={{ color: "#fff" }}
        className="bg-teal-600 mx-2 "
        onPress={() => {
          if(selectedItem!==undefined){
          handleItemData({ quantity, amount, itemName, itemCategory });}
        }}>Add Item</Button>
    </View>
  )
}