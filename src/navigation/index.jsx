import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import ListsScreen from '../screens/ListsScreen';
import AboutScreen from '../screens/AboutScreen';
import DeletedScreen from '../screens/DeletedScreen';
import NewScreen from '../screens/NewScreen';
import AccountScreen from '../screens/AccountScreen';
import { MaterialIcons } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import ItemProduct from '../components/ItemProduct';
import UpdateScreen from '../screens/UpdateScreen';
import ItemScreen from '../screens/ItemScreen';
import ListScreen from "../screens/ListScreen";
import ListCarousel from '../screens/ListCarousel';
import UpdateListScreen from '../screens/UpdateListScreen';

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
        <Stack.Screen name="Item" component={ItemScreen} />
        <Stack.Screen name="List" component={ListScreen}/>
        <Stack.Screen name="ListCarousel" component={ListCarousel}/>
        <Stack.Screen name="UpdateListScreen" component={UpdateListScreen}/>
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
              } else if (route.name === "Settings") {
                iconName = "settings";
              } else if (route.name === "New") {
                iconName = "add";
              } else if (route.name === "Account") {
                iconName = "account-circle";
              } else if (route.name === "Lists") {
                iconName = "list-alt";
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
           
            <Tab.Screen  name="Settings"  component={DrawerWindow}/>
            <Tab.Screen name="Lists" component={ListsScreen}/>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="New" component={NewScreen}/>
            <Tab.Screen name="Account" component={AccountScreen}/>
        </Tab.Navigator>
        )
      }

  function DrawerWindow(){
    return(
      <Drawer.Navigator screenOptions={{drawerStyle:{backgroundColor:"#E0F2F1"},headerTransparent:'true'}} >
        <Drawer.Screen options={{drawerActiveBackgroundColor:'#B2DFDB',drawerActiveTintColor:'#00796B',headerTintColor:"#00695C",drawerIcon:({ color, size }) => (
            <MaterialIcons name="info-outline" size={20} color={"#00695c"} />
          ),drawerInactiveTintColor:"#76a89f",drawerLabelStyle:{color:"#00695C"}}} name="About" component={AboutScreen} />
        <Drawer.Screen  options={{drawerActiveBackgroundColor:'#B2DFDB',drawerActiveTintColor:'#00796B',headerTintColor:"#00695C",drawerIcon:({ color, size }) => (
            <MaterialIcons name="delete" size={20} color={"#00695c"} />
          ),drawerInactiveTintColor:"#76a89f",drawerLabelStyle:{color:"#00695C"}}} name="Deleted" component={DeletedScreen} />
      </Drawer.Navigator>
    )
  }

  return (

    <NavigationContainer>
        <HomeStack/>
    </NavigationContainer>
  )
}