import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function AboutScreen() {
    return (
        <SafeAreaView style={{
            width: wp(100),
            height: hp(85),
        }} className="bg-teal-50/[0.8]  ">
            <View style={{ width: wp(100) }}>
                <Text className='text-teal-800 font-normal text-base m-3 p-2'>Ever found yourself forgetting things you have to buy? or Tired of writing things in a paper that might get lost in dire situations? We got you covered.
                    Shoplist is your all to go solution.
                 </Text>
                <Text className='text-teal-800 font-normal text-base mx-3 p-2'> Shoplist, an Application created to store things in separate lists which are available readily and easily shareable.</Text>
                <Text  className='text-teal-800 font-semibold  text-lg mx-3 p-2'>App Features</Text>
                <Text  className='text-teal-800 font-normal text-base mx-3 px-2'>&#10133; Create multiple New Lists & Items</Text>
                <Text  className='text-teal-800 font-normal text-base mx-3 px-2'>&#10060; Delete Lists & Items</Text>
                <Text  className='text-teal-800 font-normal text-base mx-3 px-2'>&#128274; Make Lists private</Text>
                <Text  className='text-teal-800 font-normal text-base mx-3 px-2'>&#128276; Assign time to remind you</Text>
                <Text  className='text-teal-800 font-normal text-base mx-3 px-2'>&#128279; Combine Items to create Lists</Text>
                <Text  className='text-teal-800 font-normal text-base mx-3 px-2'>&#128278; Save lists & Items </Text>
                <Text className='text-teal-800 font-normal text-center text-base m-3 p-2'> Made with &#129505; from  &#2980;&#2990;&#3007;&#2996;&#2946;&#2984;&#3006;&#2975;&#3009; &#127470;&#127475;	 </Text>
            </View>
        </SafeAreaView>
    )
}