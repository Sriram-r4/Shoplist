import { View, Text, Pressable, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { TextInput } from 'react-native-paper';
import React, { useEffect, useState } from "react";
import ProfileMen1 from "../../assets/profileImage.png"
import ProfileMen2 from "../../assets/profileMen2.png"
import ProfileWomen1 from "../../assets/profileWomen1.png"
import ProfileWomen2 from "../../assets/profileWomen2.png"
import { usefirebaseUser } from "../firebase/user"

export default function WelcomeScreen({ navigation }) {

  const profileImageData = [
    { id: 1, profImage: ProfileMen1, imgName: "Men 1" },
    { id: 2, profImage: ProfileMen2, imgName: "Men 2" },
    { id: 3, profImage: ProfileWomen1, imgName: "Women 1" },
    { id: 4, profImage: ProfileWomen2, imgName: "Women 2" }
  ]

  const [Username, setUserName] = useState("");

  const [profileImageState, setProfileImageState] = useState(profileImageData[0]);
  const [checkUser, setCheckUser] = useState(true);
  const [error, setError] = useState(false);

  const [users, addUser, fetchUser] = usefirebaseUser(navigation);

  useEffect(() => {
    setTimeout(
      () => setCheckUser(false), 4000
    )
  }, [])


  return (
    <SafeAreaView style={{ height: hp(100), width: wp(100) }} className="items-center justify-around">
    
      <View style={{ height: hp(10), width: wp(95) }} className="m-1 ">
        <Text className="text-center text-3xl font-bold text-teal-700 m-1 ">Welcome to Shoplist!</Text>
      </View>
      <View style={{ height: hp(70), width: wp(90), alignSelf: "center" }}>
        <View style={{ height: hp(10), width: wp(85) }} className="self-center">
          <Text className="text-teal-700 text-center text-xl font-medium">Enter Profile Details</Text>
          <Text className="text-teal-700 text-center  font-normal">Create your profile and press create when you are good to go </Text>
        </View>
        <View>
          <View style={{ height: hp(36), width: wp(85), alignSelf: "center" }} >
            <TextInput style={{ height: hp(6), width: wp(80), alignSelf: "center" }} className="my-4"
              mode='outlined'
              maxLength={12}
              placeholder='Should be less than 10 characters'
              placeholderTextColor={"#B2DFDB"}
              selectionColor='#B2DFDB'
              textColor='#00695C'
              outlineColor='#76a89f'
              value={Username}
              onChangeText={Uname => setUserName(Uname)}
              activeOutlineColor='#2dd4bf'
              label='Name'
              disabled={checkUser} />
            <View
              style={{ height: hp(23), width: wp(85) }} className="m-1" >
              <Text className="text-center text-teal-600 text-lg font-medium m-1">Choose your Profile Image</Text>
              <FlatList
                data={profileImageData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }, index) => {
                  return (
                    <TouchableOpacity  disabled={checkUser} onPress={() => { setProfileImageState(item); }}>
                      <View key={index} style={{ height: hp(14), width: wp(28) }} className={item.imgName == profileImageState.imgName ? "mx-2  border-4 border-spacing-2 border-teal-400 rounded-full self-center items-center " : "mx-2"}>
                        <Image source={item.profImage} style={{ height: hp(13), width: wp(26) }} />
                        <Text className="text-lg text-center text-teal-700 font-bold">{item.imgName}</Text>
                      </View>
                    </TouchableOpacity>)
                }} />
            </View>
          </View>
          <View style={{ height: hp(6), width: wp(85), alignSelf: "center" }} className="flex-row justify-around items-end">
            <Pressable
             disabled={checkUser}
              onPress={() => {
                setUserName("");
                setProfileImageState(profileImageData[0])
              }
              }
              style={({ pressed }) => ({
                height: hp(5),
                width: wp(40),
                justifyContent: "center",
                margin: 1,
                padding: 6,
                borderRadius: 5,
                backgroundColor: pressed
                  ? '#ff5330'
                  : 'tomato'
              })}>
              {({ pressed }) => (
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  {pressed ? 'Cleared!' : 'Clear'}
                </Text>
              )}
            </Pressable>
            <Pressable
            disabled={checkUser}
              onPress={() => {
                if ((profileImageState != undefined && profileImageState != {}) && (Username != "")) {
                  setError(false)
                  var UserDetails = { profileImageState, Username, userCreated: true };
                  addUser(UserDetails)
                  navigation.navigate("HomeTab")
                }
                else {
                  setError(true);
                  setTimeout(() => setError(false), 3000);
                }
              }}
              style={({ pressed }) => ({
                height: hp(5),
                width: wp(40),
                justifyContent: "center",
                margin: 1,
                padding: 6,
                borderRadius: 5,
                backgroundColor: pressed
                  ? '#0094ff'
                  : 'dodgerblue'
              })}>
              {({ pressed }) => (
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  {pressed ? 'Created!' : 'Create'}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
        {checkUser && <View style={{ height: hp(15), width: wp(90) }} className="self-center m-2">
          <Text className="text-center text-xl text-teal-700 font-medium ">Checking if Account is already logged in </Text>
          <ActivityIndicator size={50} />
        </View>}
        {error && <View style={{ height: hp(15), width: wp(90) }} className="bg-red-200 rounded-xl m-4 p-1 self-center">
          <Text className="text-2xl text-red-700 font-medium m-1" >Error!</Text>
          <Text className="  text-red-700 m-1">Unable to Process your Information. Check your details carefully and make sure no data is left empty.</Text>
        </View>}


      </View>
     
    </SafeAreaView>
  )
}