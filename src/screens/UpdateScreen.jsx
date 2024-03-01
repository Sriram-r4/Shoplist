import { View, Text, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput, Snackbar, RadioButton } from 'react-native-paper';
import { usefirebaseItemList } from '../firebase/Item_list';
import { usefirebaseOrderedList } from '../firebase/Ordered_list';

export default function UpdateScreen({ navigation, route }) {
    const ItemToBeUpdated = route.params.item;
    const previousScreen = route.params.previousScreen
    //be careful of removing unused in the below array.some functionality may break because of it
    const [items, disabled, handleItemData, updateDocument, deleteDocument,DeleteCollection] = usefirebaseItemList(navigation);
    const [confirmedItems, fetchFinalDataFromFirestore, addFinalDataToFirestore, deleteFinalDocument, updateFinalDocument] = usefirebaseOrderedList(navigation)

    //snackbar states and methods
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    //update button states
    const [updateDisabled, setUpdateDisabled] = useState(false);//update button disabled state
    const [noUpdate, setNoUpdate] = useState(false);//same update details

    //updated item states
    const [newStatus, setNewStatus] = useState(ItemToBeUpdated.status);
    const [newAmount, setNewAmount] = useState(ItemToBeUpdated.amount.toString());
    const [newQuantity, setNewQuantity] = useState(ItemToBeUpdated.quantity.toString());

    //update button method
    const handleItemUpdate = () => {

        if (((newAmount == ItemToBeUpdated.amount.toString() && newQuantity == ItemToBeUpdated.quantity.toString()) && newStatus === ItemToBeUpdated.status)) {
            if (noUpdate == false) {
                Alert.alert(
                    '\u{1F9D0} Same Details?',
                    'Are you sure not to update the selected Item ',
                    [
                        { text: 'CANCEL', onPress: () => { { } } },
                        { text: 'OK', onPress: () => { { setNoUpdate(true) } } },
                    ],
                );
            }
            else if (noUpdate) {
                setUpdateDisabled(true);
                const item = {
                    itemCategory: ItemToBeUpdated.itemCategory,
                    item_id: ItemToBeUpdated.item_id,
                    itemName: ItemToBeUpdated.itemName,
                    id: ItemToBeUpdated.id,
                    status: newStatus,
                    amount: newAmount,
                    quantity: newQuantity

                }
                if (previousScreen === true) {
                    console.log("Final Update")
                    updateFinalDocument(item);
                    
                }

                else if (previousScreen === undefined || previousScreen === false) {
                    console.log("Item Update")
                    updateDocument(item);
                   
                }
            }

        }
        else {
            setUpdateDisabled(true);
            const item = {
                itemCategory: ItemToBeUpdated.itemCategory,
                item_id: ItemToBeUpdated.item_id,
                itemName: ItemToBeUpdated.itemName,
                id: ItemToBeUpdated.id,
                status: newStatus,
                amount: newAmount,
                quantity: newQuantity

            }

            if (previousScreen === true) {
                console.log("Final Update")
                updateFinalDocument(item);
                
            }

            else if (previousScreen === undefined || previousScreen === false) {
                console.log("Item Update")
                updateDocument(item);
               
            }
            
        }

    }



    return (
        <SafeAreaView style={{
            width: wp(100),
            height: hp(92.3),
        }} className="bg-teal-50/[0.8] flex justify-between ">
            <View style={{ height: hp(6), width: wp(97), alignSelf: "center" }} className=" justify-center  bg-emerald-100 rounded-lg ">
                <Text className="text-teal-700 text-xl text-center font-bold">Update {ItemToBeUpdated.itemName}</Text>
            </View>
            <View style={{ height: hp(70), width: wp(97) }} className="flex">
                <View style={{ width: wp(95), height: hp(5) }} className="m-2 mb-5 p-1">
                    <TextInput mode='outlined'
                        label="Item Name"
                        textColor='#00695C'
                        outlineColor='#76a89f'
                        activeOutlineColor='#2dd4bf'
                        editable={false}
                        value={ItemToBeUpdated.itemName}
                        right={<TextInput.Icon icon="lock" onPress={onToggleSnackBar}
                            color={"#00695C"} />} />
                </View>
                <View style={{ width: wp(95), height: hp(5) }} className="m-2 mb-5 p-1">
                    <TextInput mode='outlined'
                        label="Item Category"
                        textColor='#00695C'
                        outlineColor='#76a89f'
                        activeOutlineColor='#2dd4bf'
                        editable={false}
                        value={ItemToBeUpdated.itemCategory}
                        right={
                            <TextInput.Icon icon="lock" onPress={onToggleSnackBar}
                                color={"#00695C"} />}
                    />
                </View>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    style={{ zIndex: 1000 }}
                    rippleColor={"#00695C"}
                    action={{
                        label: 'Dismiss',
                        labelStyle: { color: "#00695C" },
                        rippleColor: "#00695C",
                        onPress: () => {
                            onDismissSnackBar
                        },
                    }}>
                    Item Name and Category cannot be Changed.
                </Snackbar>
                <View style={{ width: wp(95), height: hp(5) }} className="m-2 mb-5 p-1">
                    <TextInput mode='outlined'
                        label="Quantity"
                        textColor='#00695C'
                        outlineColor='#76a89f'
                        activeOutlineColor='#2dd4bf'
                        keyboardType='numeric'
                        defaultValue={ItemToBeUpdated.quantity.toString()}
                        placeholder={ItemToBeUpdated.quantity.toString()}
                        value={newQuantity.toString()}
                        onChangeText={(qty) => {
                            if (parseInt(qty) >= 1) {
                                setNewQuantity(parseInt(qty))
                            }
                            else {
                                setNewQuantity(1);
                            }
                        }}
                    />
                </View>
                <View style={{ width: wp(95), height: hp(5) }} className="m-2 mb-5 p-1">
                    <TextInput mode='outlined'
                        label="Amount"
                        textColor='#00695C'
                        outlineColor='#76a89f'
                        activeOutlineColor='#2dd4bf'
                        keyboardType='numeric'
                        defaultValue={ItemToBeUpdated.amount.toString()}
                        placeholder={ItemToBeUpdated.amount.toString()}
                        value={newAmount.toString()}
                        onChangeText={(amt) => {
                            if (parseFloat(amt) >= 0) {
                                setNewAmount(parseFloat(amt))
                            }
                            else {
                                setNewAmount(1);
                            }
                        }} />
                </View>
                <View style={{ height: hp(21), width: wp(93) }} className='mx-3  mt-5  justify-center  border-solid border-teal-600 border rounded-lg '>
                    <RadioButton.Group onValueChange={status => setNewStatus(status)} value={newStatus}>
                        <RadioButton.Item color='#00695C' rippleColor='#fee2e2' labelStyle={{ color: "#00695C" }} label="&#128308;&nbsp;Important and Urgent" value="red" />
                        <RadioButton.Item color='#00695C' rippleColor='#fef9c3' labelStyle={{ color: "#00695C" }} label="&#128993;&nbsp;Important but not Urgent" value="yellow" />
                        <RadioButton.Item color='#00695C' rippleColor='#B2DFDB' labelStyle={{ color: "#00695C" }} label="&#128994;&nbsp;Not Important and Urgent" value="green" />
                    </RadioButton.Group>
                </View>
            </View>
            <View style={{ height: hp(8) }}>
                <Pressable disabled={updateDisabled} onPress={handleItemUpdate}
                    className={updateDisabled != true ? "rounded-2xl flex bg-teal-600 p-2 m-2" : "rounded-2xl flex bg-teal-200 p-2 m-2"}>
                    <Text className="text-center text-white font-bold text-xl">Update</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}