import { View,SectionList,Text,TouchableOpacity, ActivityIndicator,  Alert } from 'react-native';
import React, { useState,useEffect,useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Vegetables from '../constants/CategoryData/Vegetables.json';
import Fruits from '../constants/CategoryData/Fruits.json';
import Appliances from '../constants/CategoryData/Appliances.json';
import Condiments from '../constants/CategoryData/Condiments.json';
import Cosmetics from '../constants/CategoryData/Cosmetics.json';
import Diary from '../constants/CategoryData/Diary.json';
import DryFruits from '../constants/CategoryData/DryFruits.json';
import Grains from '../constants/CategoryData/Grains.json';
import Greens from '../constants/CategoryData/Greens.json';
import HouseholdProducts from '../constants/CategoryData/HouseholdProducts.json';
import HygieneProducts from '../constants/CategoryData/HygieneProducts.json';
import KitchenCommons from '../constants/CategoryData/KitchenCommons.json';
import Meat from '../constants/CategoryData/Meat.json';
import Oils from '../constants/CategoryData/Oils.json';
import Pulses from '../constants/CategoryData/Pulses.json';
import Rice from '../constants/CategoryData/Rice.json';
import Seeds from '../constants/CategoryData/Seeds.json';
import Spices from '../constants/CategoryData/Spices.json';
import LottieView from 'lottie-react-native';


export default function ItemProduct({route, navigation}) {
  // console.log(route.params.category);
  
  const selectedCategory=route.params.category;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
 

  const [Jdata,setJdata]=useState({});
  var sections ={};
  if(Object.keys(Jdata).length!==0){
     sections = organizeDataIntoSections(Jdata);
  }
  
   useEffect(() => {
    if(selectedCategory==="Vegetables"){
      setJdata(Vegetables);
    }
    else if(selectedCategory==="Fruits"){
      setJdata(Fruits);
    }
    else if(selectedCategory==="Appliances"){
      setJdata(Appliances);
    }
    else if(selectedCategory==="Condiments"){
      setJdata(Condiments);
    }
    else if(selectedCategory==="Cosmetics"){
      setJdata(Cosmetics);
    }
    else if(selectedCategory==="Diary"){
      setJdata(Diary);
    }
    else if(selectedCategory==="Dry Fruits"){
      setJdata(DryFruits);
    }
    else if(selectedCategory==="Grains"){
      setJdata(Grains);
    }
    else if(selectedCategory==="Greens"){
      setJdata(Greens);
    }
    else if(selectedCategory==="Household Products"){
      setJdata(HouseholdProducts);
    }
    else if(selectedCategory==="Hygiene Products"){
      setJdata(HygieneProducts);
    }
    else if(selectedCategory==="Kitchen Commons"){
      setJdata(KitchenCommons);
    }
    else if(selectedCategory==="Meat"){
      setJdata(Meat);
    }
    else if(selectedCategory==="Oils"){
      setJdata(Oils);
    }
    else if(selectedCategory==="Pulses"){
      setJdata(Pulses);
    }
    else if(selectedCategory==="Rice"){
      setJdata(Rice);
    }
    else if(selectedCategory==="Seeds"){
      setJdata(Seeds);
    }
    else if(selectedCategory==="Spices"){
      setJdata(Spices);
    }
    else{
      setJdata(Fruits);
    }
   }, [])
   
  const onChangeSearch = query => setSearchQuery(query);
  function organizeDataIntoSections(data){
     
    // Group data by the first letter of the English name
    const groupedData = data.reduce((acc, item) => {
      const firstLetter = item.english.charAt(0).toUpperCase();
  
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
  
      acc[firstLetter].push(item);
  
      return acc;
    }, {});
  
    // Convert the grouped data into an array of sections
    const sections = Object.keys(groupedData).sort().map((letter) => ({
      title: letter,
      data: groupedData[letter],
    }));
  
    return sections;
  }
  
  
  
    const handleItemPress = (item) => {
      // Toggle selection for the clicked item
      
      setSelectedItem(item);
      console.log(item);
      Toast.show({
        type: 'success',
        text1: `\u{263A} ${item.english} selected!`,
        text2:"Press \t \u{2714} Confirm" ,
        visibilityTime: 1300,
        text1Style: { color: "#00895c", fontSize: 16 },
        text2Style: { color: "#00695c", fontSize: 14 },
        position: "top",

    });
    
    };
  return (
 
    <SafeAreaView style={{ width: wp(100), height: hp(85) }}>
     
      <View style={{ width: wp(95), height: hp(7.5) }} className=" bg-teal-50 self-center ">
      
        <Searchbar
          style={{ backgroundColor: "#f0fdfa" }}
          inputStyle={{ color: "#00695C" }}
          selectionColor={"#00695C"}
          iconColor='#00695C'
          rippleColor={'#B2DFDB'}
          elevation={1}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <Toast style={{ zIndex: 1000 }} />
      <View style={{ height: hp(63) }} className="my-2 py-1 px-1">
        {Object.keys(Jdata).length===0?<ActivityIndicator/>:
        <SectionList
          style={{ margin: 3, paddingHorizontal: 5 }}
          sections={sections}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)} className="active:bg-teal-100 rounded-2xl "  >
              {selectedItem.english===item.english?<View className="px-3 rounded-2xl bg-teal-100/[0.6] py-1 m-1 flex flex-row justify-between">
                <View className="flex flex-col">
                <Text className="text-teal-800 text-base">{item.english}</Text>
                <Text className="text-teal-400 font-normal text-xs ">{item.tamil}</Text>
                </View>
                <View className="flex flex-col justify-center">
                
                <LottieView source={require("../../assets/CheckLot.json")} autoSize  style={{width:wp(5.5),height:hp(5.3)}} autoPlay />
                </View>
              </View>
              :
              <View className="px-3  py-1 m-1 flex flex-row justify-between">
                <View className="flex flex-col">
                <Text className="text-teal-800 text-base">{item.english}</Text>
                <Text className="text-teal-400 font-normal text-xs ">{item.tamil}</Text>
                </View>
                <View className="flex flex-col justify-center">
               
                </View>
              </View>}

            </TouchableOpacity>

          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="text-teal-900 font-bold text-xl p-2 px-3  bg-teal-100 rounded-2xl justify-self-start">{title}</Text>
          )}
        />
      }
      </View>
      <View className="self-center ">
        <Button style={{ width: wp(90), height: hp(6) }} title="Next" labelStyle={{ color: "#fff", fontSize: hp(2.5) }} className="bg-teal-600 p-1  mx-2 my-3 "
          icon="check-bold"
          onPress={() => {
            // console.log("Item Selected")
            selectedItem["category"]=selectedCategory;
            navigation.navigate("New",{selectedItem})
          }}>Confirm</Button>
      </View>
    </SafeAreaView>);

}