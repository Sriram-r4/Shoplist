import { View, Text, FlatList,  Pressable ,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Appliances from "../../assets/Categories/HomeAppliances.png"
import Vegetables from "../../assets/Categories/Vegetables.png"
import Fruits from "../../assets/Categories/Fruits.png"
import Condiments from "../../assets/Categories/Condiments1.png"
import Cosmetics from "../../assets/Categories/Cosmetics.png"
import Diary from "../../assets/Categories/Diary.png"
import DryFruits from "../../assets/Categories/DryFruits.png"
import Grains from "../../assets/Categories/Grains.png"
import Greens from "../../assets/Categories/Greens.png"
import Households from "../../assets/Categories/HouseholdProducts.png"
import HygieneProducts from "../../assets/Categories/HygieneProducts.png"
import KitchenCommons from "../../assets/Categories/KitchenCommons.png"
import Rice from "../../assets/Categories/Rice.png"
import Meat from "../../assets/Categories/Meat.png"
import Pulses from "../../assets/Categories/Pulses.png"
import Oils from "../../assets/Categories/Oils.png"
import Seeds from "../../assets/Categories/Seeds.png"
import Spices from "../../assets/Categories/Spices.png"
import { Badge } from 'react-native-paper'

export default function ItemsScreen({navigation}) {

  const CategoryData=[
    {
      "id":1,
      "category":"Appliances",
      "category_image":Appliances
    },
    {
      "id":2,
      "category":"Condiments",
      "category_image":Condiments
    },
    {
      "id":3,
      "category":"Cosmetics",
      "category_image":Cosmetics
    },
    {
      "id":4,
      "category":"Diary",
      "category_image":Diary
    },
    {
      "id":5,
      "category":"Dry Fruits",
      "category_image":DryFruits
    },
    {
      "id":6,
      "category":"Fruits",
      "category_image":Fruits
    },
    {
      "id":7,
      "category":"Grains",
      "category_image":Grains
    },
    {
      "id":8,
      "category":"Greens",
      "category_image":Greens
    },
    {
      "id":9,
      "category":"Household Products",
      "category_image":Households
    },
    {
      "id":10,
      "category":"Hygiene Products",
      "category_image":HygieneProducts
    },
    {
      "id":11,
      "category":"Kitchen Essentials",
      "category_image":KitchenCommons
    },
    {
      "id":12,
      "category":"Meat",
      "category_image":Meat
    },
    {
      "id":13,
      "category":"Oils",
      "category_image":Oils
    },
    {
      "id":14,
      "category":"Pulses",
      "category_image":Pulses
    },
    {
      "id":15,
      "category":"Rice",
      "category_image":Rice
    },

    {
      "id":16,
      "category":"Seeds",
      "category_image":Seeds
    },
    {
      "id":17,
      "category":"Spices",
      "category_image":Spices
    },
    {
      "id":18,
      "category":"Vegetables",
      "category_image":Vegetables
    },
  ];

  
  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(93),
    }} className="bg-teal-50/[0.8]  ">


      <View style={{ height: hp(85), width: wp(97) }} className="self-center ">

        <FlatList
          numColumns={3}
          showsVerticalScrollIndicator={false}
          data={CategoryData.sort((a,b)=>a.id-b.id)}
          renderItem={
            ({item}) => (
              <Pressable onPress={()=>{navigation.navigate("CategoryItems",{selectedCategory:item.category})}}>
                {({ pressed }) => (
              <View style={{ height: hp(22), width: wp(30) }} key={item.id} className={pressed?"py-1 mx-1 my-2 px-0.5 border-2 border-teal-700/[0.5] rounded-xl bg-teal-100/[0.8]":"bg-teal-100 rounded-xl py-1  my-2 mx-1"}>
                
                <Text style={{height:hp(4)}} className="text-teal-800 text-wrap text-center font-medium text-lg">{item.category}</Text>
                <Image source={item.category_image} style={{height:hp(15),width:wp(25),alignSelf:"center",objectFit:"contain"}} />
              
              </View>)}
              </Pressable>
            )
          }
        />
      </View>
    </SafeAreaView >
  )
}