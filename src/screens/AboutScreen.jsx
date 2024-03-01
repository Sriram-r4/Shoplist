import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Banner, PaperProvider } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { Dialog, Portal } from 'react-native-paper';

export default function AboutScreen() {
    const [BannerVisible, setBannerVisible] = useState(true);
    const [IssuesModalVisible, setIssuesModalVisible] = useState(false);

    const hideDialog = () => setIssuesModalVisible(false);
    return (
        <PaperProvider>
            <ScrollView>
                <SafeAreaView style={{
                    width: wp(100),
                    height: hp(85),
                }} className="bg-teal-50/[0.8]  ">

                    <Banner
                        visible={BannerVisible}
                        theme={{ colors: { primary: "#00695C" } }}
                        style={{ height: hp(17), width: wp(96), alignSelf: "center", backgroundColor: "#E0F2F1", borderRadius: 10 }}
                        actions={[
                            {
                                label: 'Learn more',
                                onPress: () => { setIssuesModalVisible(true) },
                            },
                        ]}
                        icon={() => (
                            <Ionicons name="warning" size={30} color="#00695C" />
                        )}>
                        Some issues are observed in certain devices. Press Learn More to see all the issues .
                    </Banner>
                    <Portal>
                        <Dialog visible={IssuesModalVisible} onDismiss={hideDialog} theme={{ colors: { primary: "#00695C" } }}
                            style={{ height: hp(60), width: wp(90), alignSelf: "center", backgroundColor: "#E0F2F1" }}
                        >
                            <Dialog.ScrollArea>
                                <ScrollView contentContainerStyle={{ paddingHorizontal: 24 ,alignSelf:"center",width:wp(85) }} showsVerticalScrollIndicator={false}>
                                    <View className="p-1 m-2 self-center flex-1">
                                        <View className="m-2">
                                            <Text className="text-xl font-semibold text-center">Issues</Text>
                                        </View>
                                        <View className="m-2 p-1">
                                            <Text className="text-teal-700 font-medium">#1 To prevent Items getting Added more than once if you press button continuously.</Text>
                                            <Text  className="text-teal-500 font-normal">Fixture: Please wait for some time after you press a button </Text>
                                        </View>
                                        <View className="m-2 p-1">
                                            <Text  className="text-teal-700 font-medium">#2 When long pressing the items in the Home Screen,the long press take more time to get selected</Text>
                                            <Text  className="text-teal-500 font-normal">Fixture: Currently there is no fix for this and we are working on it. </Text>
                                        </View>
                                        <View className="m-2 p-1">
                                            <Text className="text-teal-700 font-medium"># Other Issues</Text>
                                            <Text className="text-teal-500 font-normal"> : ( We're working our best to provide seamless functionality to our users.Our main goal is to make the application experience smoother and easier. </Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </Dialog.ScrollArea>
                        </Dialog>
                    </Portal>

                    <View style={{ width: wp(100) }}>
                        <Text className='text-teal-800 font-normal text-base m-3 p-2'>Ever found yourself forgetting things you have to buy? or Tired of writing things in a paper that might get lost in dire situations? We got you covered.
                            Shoplist is your all to go solution.
                        </Text>
                        <Text className='text-teal-800 font-normal text-base mx-3 p-2'> Shoplist, an Application created to store things in separate lists which are available readily and easily shareable.</Text>
                        <Text className='text-teal-800 font-semibold  text-lg mx-3 p-2'>App Features</Text>
                        <Text className='text-teal-800 font-normal text-base mx-3 px-2'>&#10133; Create multiple New Lists & Items</Text>
                        <Text className='text-teal-800 font-normal text-base mx-3 px-2'>&#10060; Delete Lists & Items</Text>
                        {/* <Text className='text-teal-800 font-normal text-base mx-3 px-2'>&#128274; Make Lists private</Text>
                        <Text className='text-teal-800 font-normal text-base mx-3 px-2'>&#128276; Assign time to remind you</Text> */}
                        <Text className='text-teal-800 font-normal text-base mx-3 px-2'>&#128279; Combine Items to create Lists</Text>
                        <Text className='text-teal-800 font-normal text-base mx-3 px-2'>&#128278; Save lists & Items </Text>
                        <Text className='text-teal-800 font-normal text-center text-base m-3 p-2'> Made with &#10084; from  &#2980;&#2990;&#3007;&#2996;&#2946;&#2984;&#3006;&#2975;&#3009; &#127470;&#127475;	 </Text>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </PaperProvider>
    )

}