import { View, Text,Alert} from 'react-native';
import React, { useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput, RadioButton, Surface,Button } from 'react-native-paper';
import { usefirebaseList } from '../firebase/List';

export default function UpdateListScreen({ route, navigation }) {
    const UpdateList = route.params.updateList
   
    const [ListItemData, setListItemData, fetchListDataFromFirestore, addListDataToFirestore, deleteListDocument, updateListDocument] = usefirebaseList(navigation)

    const [liststatus, setListStatus] = useState(UpdateList.liststatus);
    const [listname, setListname] = useState(UpdateList.listname);
    const [listdes, setListDes] = useState(UpdateList.listdes);

    const handleListUpdate=({listdes,listname,liststatus})=>{
        const item={...UpdateList,listdes,listname,liststatus}
        updateListDocument(item)
    }


   
    return (
        <SafeAreaView style={{
            width: wp(100),
            height: hp(93),
        }} className="bg-teal-50/[0.8]  ">
            <View style={{ height: hp(6), width: wp(97), alignSelf: "center" }} className=" justify-center  bg-emerald-100 rounded-lg ">
                <Text className="text-teal-700 text-xl text-center font-bold">Update {UpdateList.listname}</Text>
            </View>
            <View style={{ width: wp(96), height: hp(70) }} className='p-2 m-2 self-center '>
            
            <Surface style={{ width: wp(95) }} className="self-center px-3 py-1 my-4 mx-2 bg-gray-50  rounded-lg">
                <View className=" flex justify-between">
                    <TextInput style={{ height: hp(6) }} className="my-4"
                        mode='outlined'
                        selectionColor='#00695C'
                        textColor='#00695C'
                        outlineColor='#76a89f'
                        activeOutlineColor='#2dd4bf'
                        value={listname}
                        onChangeText={listname => setListname(listname)}
                        label='List Name' />
                    <TextInput
                        style={{height:hp(8)}}
                        maxLength={80}
                        mode='outlined'
                        label="Description"
                        textColor='#00695C'
                        outlineColor='#76a89f'
                        activeOutlineColor='#2dd4bf'
                        value={listdes}
                        onChangeText={listdes => setListDes(listdes)}
                        multiline />
                    <View style={{ height: hp(21) }} className='my-4 border-solid border-teal-600 border rounded-lg '>
                        <RadioButton.Group onValueChange={status => setListStatus(status)} value={liststatus}>
                            <RadioButton.Item color='#00695C' rippleColor='#fee2e2' labelStyle={{ color: "#00695C" }} label="&#128308;&nbsp;Important and Urgent" value="red" />
                            <RadioButton.Item color='#00695C' rippleColor='#fef9c3' labelStyle={{ color: "#00695C" }} label="&#128993;&nbsp;Important but not Urgent" value="yellow" />
                            <RadioButton.Item color='#00695C' rippleColor='#B2DFDB' labelStyle={{ color: "#00695C" }} label="&#128994;&nbsp;Not Important and Urgent" value="green" />
                        </RadioButton.Group>
                    </View>
                </View>
            </Surface>
            <Button style={{ width: wp(90), height: hp(5) }}
                title="Add Item" labelStyle={{ color: "#fff" }}
                className="bg-teal-600 mx-2 "
                onPress={() => {
                    if (listdes==UpdateList.listdes&&listname==UpdateList.listname&&liststatus==UpdateList.liststatus) {
                    //    handleListDetails({listdes,listname,liststatus})
                    //     // setListname("")
                    //     // setListDes("")
                    //     // setListStatus(null)
                    Alert.alert(
                        'Same Details?',
                        "Are you sure want to make no changes",
                        [
                            {text:"OK",onPress:()=>{}},
                            {text:"CANCEL",onPress:()=>{}}
                        ]
                    )
                    }
                    else {
                        console.log({listdes,listname,liststatus}) 
                        handleListUpdate({listdes,listname,liststatus})
                        
                    }
                }}>Update List Details</Button>
        </View>



        </SafeAreaView>
    )
}