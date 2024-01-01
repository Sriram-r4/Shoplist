import { View} from 'react-native';
import React, { useState} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar,Button } from 'react-native-paper';


export default function ItemProduct({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);
  return (
    <SafeAreaView  style={{width:wp(100),height:hp(85)}}>
         <View style={{width:wp(95),height:hp(7.5)}} className=" bg-teal-50 self-center ">
       <Searchbar
       style={{backgroundColor:"#f0fdfa"}}
       inputStyle={{color:"#00695C"}}
       selectionColor={"#00695C"}
       iconColor='#00695C'
       rippleColor={'#B2DFDB'}
       elevation={2}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
     </View>
     <View className="self-center ">
      <Button style={{ width: wp(90), height: hp(6) }} title="Next" labelStyle={{color:"#fff",fontSize:hp(2.5)}} className="bg-teal-600 p-1  mx-2 my-3 " 
     icon="check-bold"
     onPress={()=>{console.log("Item Selected")
     navigation.navigate("New")}}>Confirm</Button>
     </View>
    </SafeAreaView>);
   
}