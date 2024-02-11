import {View,Text, FlatList,TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar,Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';


function ItemList({navigation}) {

  const [selectedCategory, setSelectedCategory] = useState(" ");
  
  const category=[
    {"id":1,"title":"Appliances","value":"Appliances"},
    {"id":2,"title":"Condiments","value":"Condiments"},
    {"id":3,"title":"Cosmetics","value":"Cosmetics"},
    {"id":4,"title":"Diary","value":"Diary"},
    {"id":5,"title":"Dry Fruits","value":"DryFruits"},
    {"id":6,"title":"Fruits","value":"Fruits"},
    {"id":7,"title":"Greens","value":"Greens"},
    {"id":8,"title":"Grains","value":"Grains"},
    {"id":9,"title":"Household Products","value":"HouseholdProducts"},
    {"id":10,"title":"Hygiene Products","value":"HygieneProducts"},
    {"id":11,"title":"Kitchen Commons","value":"KitchenCommons"},
    {"id":12,"title":"Meat","value":"Meat"},
    {"id":13,"title":"Oils","value":"Oils"},
    {"id":14,"title":"Pulses","value":"Pulses"},
    {"id":15,"title":"Rice","value":"Rice"},
    {"id":16,"title":"Seeds","value":"Seeds"},
    {"id":17,"title":"Spices","value":"Spices"},
    {"id":18,"title":"Vegetables","value":"Vegetables"},
  ];

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity className=" m-1" onPress={()=>handleItemPress(item)}>
    <View className="p-2 flex-row justify-between " >
      <Text className="text-teal-700 font-semibold text-lg ">{item.title}</Text>
      <MaterialIcons name='chevron-right' size={30} style={{color:"#00695C"}}/>
    </View>
    </TouchableOpacity>
  );
  
  const handleItemPress=(item)=>{
    setSelectedCategory(item.title);
    navigation.navigate('ItemProduct',{category:item.title});
  }


  return (
    
     <View style={{width:wp(97),height:hp(85)}} className=" mx-1.5 p-1 ">
      <FlatList
      data={category}
      renderItem={renderCategoryItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      />
     </View>   
    
  )
}

export default ItemList