import { View, Text, TouchableOpacity,Alert} from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, RadioButton, Surface } from 'react-native-paper';

export default function ListInfo({handleListDetails}) {
    const [liststatus, setListStatus] = useState(null);
    const [listname, setListname] = useState('');
    const [listdes, setListDes] = useState('');


    return (
        <View style={{ width: wp(93), height: hp(57) }} className='p-2 m-2 self-center'>
            <Text className="text-teal-700 text-xl text-center font-medium">Basic List Information</Text>
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
                    if (listdes!=""&&listname!=""&&liststatus!=null) {
                       handleListDetails({listdes,listname,liststatus})
                        // setListname("")
                        // setListDes("")
                        // setListStatus(null)
                    }
                    else {
                        Alert.alert(
                            '\u{1F61E} Missing Details!',
                            'Fill all the details of the List',
                            [
                                { text: 'OK', onPress: () => { { } } },
                            ],

                        );
                    }
                }}>Add List Details</Button>
        </View>

    )
}