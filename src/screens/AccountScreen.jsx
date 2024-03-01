import { View, Text, Image, TouchableOpacity, Pressable,FlatList,Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Divider, FAB, Surface, PaperProvider, Portal, Modal, TextInput } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { usefirebaseList } from '../firebase/List'
import { usefirebaseOrderedList } from '../firebase/Ordered_list'
import { useIsFocused } from '@react-navigation/native'
import ProfileMen1 from "../../assets/profileImage.png"
import ProfileMen2 from "../../assets/profileMen2.png"
import ProfileWomen1 from "../../assets/profileWomen1.png"
import ProfileWomen2 from "../../assets/profileWomen2.png"
import {usefirebaseUser} from "../firebase/user"
import { getDateFromTimestamp, getDayFromDateTimestamp } from '../firebase/dateConversion'
import LottieView from "lottie-react-native"

export default function AccountScreen({ navigation }) {
  const profileImageData=[
    {id:1,profImage:ProfileMen1,imgName:"Men 1"},
    {id:2,profImage:ProfileMen2,imgName:"Men 2"},
    {id:3,profImage:ProfileWomen1,imgName:"Women 1"},
    {id:4,profImage:ProfileWomen2,imgName:"Women 2"}
  ]

  const [listActive, setListActive] = useState(false);
  const [showStats, setShowSats] = useState(false);

  const [currentItems, setCurrentItems] = useState([0, 0, 0])
  const [currentLists, setCurrentLists] = useState([0, 0, 0])

  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const [Username, setUserName] = useState("");
  const [profileImageState,setProfileImageState]=useState(profileImageData[0]);
  const [UserConfirmation, setUserConfirmation] = useState("");

  const isFocusedScreen = useIsFocused();

  const [confirmedItems, fetchFinalDataFromFirestore, addFinalDataToFirestore, deleteFinalDocument, updateFinalDocument] = usefirebaseOrderedList();
  const [ListItemData, setListItemData, fetchListDataFromFirestore, addListDataToFirestore, deleteListDocument, updateListDocument] = usefirebaseList(navigation)
  const [users,addUser,fetchUser,updateUser]=usefirebaseUser();

  
  
  useEffect(() => {
    fetchFinalDataFromFirestore()
    ItemStats()
  }, [isFocusedScreen])

  useEffect(() => {
    fetchListDataFromFirestore()
  }, [isFocusedScreen])

  useEffect(()=>{
  fetchUser()
  users
  },[users])


 
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showDeleteModal = () => setDeleteVisible(true);
  const hideDeleteModal = () => setDeleteVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  function ItemStats() {
    let greenItemStats = 0;
    let redItemStats = 0;
    let yellowItemStats = 0;
    if (confirmedItems != undefined) {
      confirmedItems.forEach((ele) => {
        if (ele.status == "green") {
          greenItemStats++;
        }
        if (ele.status == "red") {
          redItemStats++;
        }
        if (ele.status == "yellow") {
          yellowItemStats++;
        }
      })
    }
    let currentItemsStats = [redItemStats, yellowItemStats, greenItemStats]

    return currentItemsStats
  }

  function ListStats() {
    let greenListStats = 0;
    let redListStats = 0;
    let yellowListStats = 0;
    if (ListItemData != undefined) {
      ListItemData.forEach((ele) => {
        if (ele.liststatus == "green") {
          greenListStats++;
        }
        if (ele.liststatus == "red") {
          redListStats++;
        }
        if (ele.liststatus == "yellow") {
          yellowListStats++;
        }
      })
    }
    let currentListStats = [redListStats, yellowListStats, greenListStats]

    return currentListStats
  }

  

  return (
    <PaperProvider>
      {(users[0]!=undefined&&users[0]!=null)?
      <SafeAreaView style={{
        width: wp(100),
        height: hp(85),
      }} className="bg-teal-50/[0.8]  ">
       
        <View style={{ height: hp(20), width: wp(92), alignSelf: "center" }} className="bg-teal-100 flex flex-row m-2 justify-around items-center rounded-xl">
      
          <View style={{ height: hp(13), width: wp(26) }} className="bg-cyan-100 rounded-full">
            <Image source={users[0].profileImageState.profImage} alt='profile' style={{ height: hp(13), width: wp(26) }} />
          </View>
          <View style={{ height: hp(13), width: wp(50) }} className="justify-center m-1">
            <View className=" p-1 m-0.5 flex-col flex-wrap " style={{ height: hp(5), width: wp(50) }} >
              <Text style={{ height: hp(5), width: wp(50) }} className="text-teal-700 text-3xl font-semibold text-ellipsis">{users[0].Username||"zoro"}</Text>
            </View>
            <View className=" flex-col m-0.5 p-1" style={{ height: hp(5) }}>
              <Text className="text-teal-600 font-medium text-sm">Joined {getDateFromTimestamp(users[0].timeStamp)||"15th December 2023"} </Text>
            </View>
          </View>
        </View>
        <Divider />
        <View style={{ height: hp(22), width: wp(90), alignSelf: "center" }} className="bg-teal-100/[0.5] rounded-2xl m-2 p-1 ">
          <View style={{ height: hp(13), width: wp(85), alignSelf: "center" }} className="bg-teal-50/[0.6] flex-row justify-around items-center rounded-2xl m-1">
            <FAB
              icon="format-list-bulleted-square"
              color='#00695c'
              label='List'
              style={{ height: hp(7.6), width: wp(28), alignContent: "space-around", backgroundColor: "#f0fdfa" }}
              className="m-2 justify-center "
              onPress={() => {
                setShowSats(true);
                setCurrentLists(ListStats());
                setListActive(true);
              }
              }
            />
            <FAB
              icon="apps-box"
              color='#00695c'
              label='Items'
              style={{ height: hp(7.6), width: wp(28), alignContent: "space-around", backgroundColor: "#f0fdfa" }}
              className="m-2 justify-center "
              onPress={() => {
                setShowSats(true);
                setCurrentItems(ItemStats());
                setListActive(false);
              }}
            />
          </View>
          {showStats == false ?
            <View style={{ height: hp(5.6), width: wp(85), alignSelf: "center" }} className="bg-slate-50  flex-row justify-around items-center rounded-2xl m-1">
              <Text className="text-teal-700 font-semibold text-lg  ">Tap List / Items to see the stats!</Text>
            </View>
            :
            <View style={{ height: hp(5.6), width: wp(85), alignSelf: "center" }} className="bg-slate-50  flex-row justify-around items-center rounded-2xl m-1">
              <Surface style={{ height: hp(4), width: wp(20), justifyContent: "space-around" }} className="bg-teal-100 flex-row rounded-xl">
                <View style={{ height: hp(2.5), width: wp(5) }} className="bg-red-400 m-1 p-1  rounded-full "></View>
                <Text className="text-teal-700 font-semibold text-lg  ">
                  {listActive === true ? currentLists[0] : currentItems[0]}
                </Text>
              </Surface>
              <Surface style={{ height: hp(4), width: wp(20), justifyContent: "space-around" }} className="bg-teal-100 flex-row rounded-xl">
                <View style={{ height: hp(2.5), width: wp(5) }} className="bg-yellow-400 m-1 p-1  rounded-full "></View>
                <Text className="text-teal-700 font-semibold text-lg  ">
                  {listActive === true ? currentLists[1] : currentItems[1]}
                </Text>
              </Surface>
              <Surface style={{ height: hp(4), width: wp(20), justifyContent: "space-around" }} className="bg-teal-100 flex-row rounded-xl">
                <View style={{ height: hp(2.5), width: wp(5) }} className="bg-green-400 m-1 p-1  rounded-full "></View>
                <Text className="text-teal-700 font-semibold text-lg  ">
                  {listActive === true ? currentLists[2] : currentItems[2]}
                </Text>
              </Surface>
            </View>}
        </View>
        <Divider />
        <View style={{ height: hp(20), width: wp(90), alignSelf: "center" }} className="bg-teal-100/[0.6] m-2 items-center  p-1 rounded-2xl">
          <Text className="text-teal-700 text-xl font-medium m-2 " >Actions</Text>
          <View>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} style={{ height: hp(60), width: wp(95), margin: wp(3), alignSelf: "center" }} contentContainerStyle={{ ...containerStyle, height: hp(60), width: wp(95), margin: 2, alignSelf: "center", alignItems: "center", borderRadius: 10 }}>
                <View style={{ height: hp(60), width: wp(90) ,alignSelf:"center",justifyContent:"center"}}>
                  <View style={{ height: hp(10), width: wp(85) }} className="self-center">
                    <Text className="text-teal-700 text-center text-xl font-medium">Edit Profile</Text>
                    <Text className="text-teal-700 text-center  font-normal">Change your details and press Update when you are good to go </Text>
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
                        label='Name' />
                        <View
                         style={{height:hp(23),width:wp(85)}} className="m-1" >
                          <Text className="text-center text-teal-600 text-lg font-medium m-1">Change your Profile Image</Text>
                          <FlatList
                          data={profileImageData}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          renderItem={({item},index)=>{
                            return(
                            <TouchableOpacity onPress={()=>{setProfileImageState(item);}}>
                              <View key={index} style={{height:hp(14),width:wp(28)}} className={item.imgName==profileImageState.imgName?"mx-2  border-4 border-spacing-2 border-teal-400 rounded-full self-center items-center ":"mx-2"}>
                              <Image source={item.profImage} style={{height:hp(13),width:wp(26)}}/>
                              <Text className="text-lg text-center text-teal-700 font-bold">{item.imgName}</Text>
                            </View>
                            </TouchableOpacity>)
                          }}/>
                        </View>
                    </View>
                    <View style={{ height: hp(6), width: wp(85), alignSelf: "center" }} className="flex-row justify-around items-center">
                      <Pressable
                        onPress={()=>{
                          setUserName("");
                          setProfileImageState(profileImageData[0])
                          hideModal()
                        }}
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
                            {pressed ? 'Cancelled!' : 'Cancel'}
                          </Text>
                        )}
                      </Pressable>
                      <Pressable
                        onPress={() => { 
                          var UserDetails={profileImageState,Username};
                          updateUser(UserDetails)
                          hideModal()
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
                            {pressed ? 'Updated!' : 'Update'}
                          </Text>
                        )}
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </Portal>
            <TouchableOpacity style={{ height: hp(5), width: wp(85) }} className="flex-row "
              onPress={showModal}>
              <MaterialIcons name='edit' size={20} color={"#00695c"} style={{ margin: 3, padding: 1.5 }} />
              <Text className="text-teal-700 text-xl font-medium ml-2 ">Edit Profile</Text>
            </TouchableOpacity>
            <Divider />
            {/* <TouchableOpacity style={{ height: hp(5), width: wp(85) }} className="flex-row mt-3">
              <MaterialIcons name='share' size={20} color={"#00695c"} style={{ margin: 3, padding: 1.5 }} />
              <Text className="text-teal-700 text-xl font-medium ml-2">Share </Text>
            </TouchableOpacity> */}
            <Divider />
            <Portal>
              <Modal visible={deleteVisible} onDismiss={hideDeleteModal} style={{ height: hp(90), width: wp(95), margin: wp(3), alignSelf: "center", justifyContent: "flex-start" }} contentContainerStyle={{ ...containerStyle, height: hp(40), width: wp(95), margin: 2, alignSelf: "center", alignItems: "center", borderRadius: 10 }}>
                <View style={{ height: hp(30), width: wp(90) }}>
                  <View style={{ height: hp(10), width: wp(85) }} className="self-center">
                    <Text className="text-teal-700 text-center text-xl font-medium">Delete Account</Text>
                    <Text className="text-teal-700 text-center  font-normal">This a permanent action and irreversible make sure you really want to delete your account. </Text>
                  </View>
                  <View>
                    <View style={{ height: hp(14), width: wp(85), alignSelf: "center" }} >
                      <TextInput style={{ height: hp(6), width: wp(80), alignSelf: "center" }} className="my-4"
                        mode='outlined'
                        maxLength={12}
                        placeholder="Type 'CONFIRM' without space "
                        placeholderTextColor={"#B2DFDB"}
                        selectionColor='#B2DFDB'
                        textColor='#00695C'
                        outlineColor='#76a89f'
                        value={UserConfirmation}
                        onChangeText={c => setUserConfirmation(c)}
                        activeOutlineColor='#2dd4bf'
                        label="User Confirmation" />
                    </View>
                    <View style={{ height: hp(6), width: wp(85), alignSelf: "center" }} className="flex-row justify-around items-center">
                      <Pressable
                        onPress={()=>{
                          setUserConfirmation("")
                          hideDeleteModal()}}
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
                            {pressed ? 'Cancelled!' : 'Cancel'}
                          </Text>
                        )}
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          if(UserConfirmation.toString().trim().toUpperCase()=="CONFIRM"){
                            Alert.alert("\u{1F5D1}Account Deletion Request Submitted!",
                            "Your Request to delete your Account has been submitted to our Server. Account will be terminated and Data will be removed from our Database once our reviewer verifies it."
                            ,[
                              {text:"OK",onPress:()=>{
                                setUserConfirmation("")
                                hideDeleteModal()
                              }}
                            ])
                          }
                          else{
                            Alert.alert("\u{1F61F}	Account Deletion Request Failed!",
                            "Please type the correct Confirmation Code 'CONFIRM'."
                            ,[
                              {text:"OK",onPress:()=>{
                                setUserConfirmation("")
                              }}
                            ])
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
                            {pressed ? 'Deleted!' : 'Delete'}
                          </Text>
                        )}
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </Portal>
            <TouchableOpacity onPress={showDeleteModal} style={{ height: hp(5), width: wp(85) }} className="flex-row mt-3">
              <MaterialIcons name='delete' size={20} color={"#00695c"} style={{ margin: 3, padding: 1.5 }} />
              <Text className="text-teal-700 text-xl font-medium ml-2">Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>
        :
        <SafeAreaView style={{
          width: wp(100),
          height: hp(85),
        }} className="bg-teal-50/[0.8]  ">
          <View style={{ height: hp(85), width: wp(95) }} className=" flex-1 items-center justify-center self-center">
                    <LottieView source={require("../../assets/Loading.json")} style={{ height: hp(30), width: wp(60), alignSelf: "center", alignItems: "center" }} autoPlay />
                    <Text style={{ height: hp(6) }} className="text-teal-500 text-2xl font-semibold text-center ">Loading...</Text>
          </View>
          </SafeAreaView>}
      
    </PaperProvider>
  )
}