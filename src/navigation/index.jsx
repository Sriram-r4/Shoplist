import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import SavedScreen from '../screens/SavedScreen';
import AboutScreen from '../screens/AboutScreen';
import DeletedScreen from '../screens/DeletedScreen';
import NewScreen from '../screens/NewScreen';
import AccountScreen from '../screens/AccountScreen';
import { MaterialIcons } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import ItemProduct from '../components/ItemProduct';
import UpdateScreen from '../screens/UpdateScreen';


const Stack=createNativeStackNavigator();
const Tab =createBottomTabNavigator();
const Drawer=createDrawerNavigator();

export default function AppNavigation() {
   
    
    function HomeStack() {
      return (
       <Stack.Navigator 
       screenOptions={ {
            
            headerTitle:"Shoplist",
            headerStyle:{
            backgroundColor:"#0f766e",
            },
            headerTitleStyle:{
                color:"#fff",
                fontSize:30,
                
            },
            headerTitleAlign:"left",
            headerLeft: () => (
                <MaterialIcons
                  name='shopping-cart' color={'#fff'} size={30}
                />
              ),
       }}
        
       initialRouteName='Home'
       >
        <Stack.Screen name="HomeTab" component={HomeTabs} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Items" component={ItemStack} />
        <Stack.Screen name="Update" component={UpdateScreen}/>
       </Stack.Navigator>
      )
    }

    function ItemStack(){
      return(
      <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"#f0fdfa"},headerTransparent:"true",contentStyle:{backgroundColor:"#f0fdfa"}}} initialRouteName='ItemCategory'>
        <Stack.Screen name="ItemCategory" options={{title:"Select Item Category"}}  component={ItemList}/>
        <Stack.Screen name="ItemProduct" component={ItemProduct}/>
      </Stack.Navigator>)
    }
    

    function HomeTabs() {
        return (
        <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              let iconName;
  
              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Menu") {
                iconName = "menu";
              } else if (route.name === "New") {
                iconName = "add";
              } else if (route.name === "Account") {
                iconName = "account-circle";
              } else if (route.name === "Saved") {
                iconName = "bookmark";
              }

  
              const customizeSize = 32;
  
              return (
                <MaterialIcons
                  name={iconName}
                  size={customizeSize}
                  color={focused ? "#2dd4bf" : "#76a89f"}
                />
              );
            },
            tabBarActiveTintColor: "#2dd4bf",
            tabBarInactiveTintColor:"#76a89f",
            tabBarStyle: {
              backgroundColor: "#f0fdfa",
              borderTopWidth: 0,
              paddingBottom: 10,
              width:wp(100),
              height:hp(9),
              borderRadius:10,
            },
            
          })}
          >
           
            <Tab.Screen  name="Menu"  component={DrawerWindow}/>
            <Tab.Screen name="Saved" component={SavedScreen}/>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="New" component={NewScreen}/>
            <Tab.Screen name="Account" component={AccountScreen}/>
        </Tab.Navigator>
        )
      }

  function DrawerWindow(){
    return(
      <Drawer.Navigator screenOptions={{drawerStyle:{backgroundColor:"#E0F2F1"},headerTransparent:'true'}} >
        <Drawer.Screen options={{drawerActiveBackgroundColor:'#B2DFDB',drawerActiveTintColor:'#00796B',headerTintColor:"#00695C"}} name="About" component={AboutScreen} />
        <Drawer.Screen  options={{drawerActiveBackgroundColor:'#B2DFDB',drawerActiveTintColor:'#00796B',headerTintColor:"#00695C"}}name="Deleted" component={DeletedScreen} />
      </Drawer.Navigator>
    )
  }

  return (

    <NavigationContainer>
        <HomeStack/>
    </NavigationContainer>
  )
}