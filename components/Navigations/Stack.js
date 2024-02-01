/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
// In App.js in a new project

import React, { useState } from 'react';
import { TouchableOpacity ,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
// import {Badge } from 'react-native-elements';
//screens
import FrontPage from '../Screens/MainFirst';
import LoginScreen from '../Screens/LoginScreen';
import BottomScreen from './Bottom';
import SplashScreen from '../Screens/SplashScreen';
import ElectricityBill from '../Screens/ElectricityBill';
import WaterUsageBill from '../Screens/WaterBill';
import ChangePass from '../Screens/ChangePass';
import ElectricityBillList from '../Screens/ElectricityBllList';
import WaterUsageBillList from '../Screens/WaterBillList';
import BillDetails from '../Screens/BillDetails';
import RewardScreen from '../Screens/RewardScreen';
import BillDetailsWater from '../Screens/BillDetailsWater';
import ComplainScreen from '../Screens/ComplainScreen';
import AboutApp from '../Screens/AboutApp';
import ContactUs from '../Screens/ContactUs';
// import ChangeLange from '../Screens/changeLange';
import TestPage from '../Screens/TestPage';
// for water saving tips and tricks
import WaterSavingTips from '../Screens/SavingTipsWater';
import WaterUsageTracker from '../Screens/WaterUsageTracker';
import Notification from '../Screens/Notification';
import WaterReport from '../Screens/WaterReport';
import TableData from '../Screens/TableData'
const Stack = createNativeStackNavigator();

function App() {

  React.useEffect(() => {
    // Simulate an asynchronous operation (e.g., loading data, setting up resources)
    // This setTimeout is just for demonstration purposes, replace it with your actual loading logic
    setTimeout(() => {
      setLoading(false); // Set loading to false after your data is loaded or setup is complete
    }, 2000); // Simulate a 2-second loading time (adjust as needed)
  }, []);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#427ffe', // Set the header background color
        },
        headerTintColor: '#FFFFFF', // Set the header text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // headerTitleAlign: 'center',
        headerShadowVisible: true,
      }}>
        {loading ?
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
            title: 'Login',
            headerShown: false,
          }} />
          :
          // Your main app content goes here
          <Stack.Screen
            name="MainFirst"
            component={FrontPage}
            options={({ navigation }) => ({
              title: 'Alter your password',
              headerShown: false,
              // headerBackVisible: false, // Optionally hide the back button based on a condition
              headerLeft: () => null, // Optionally hide the back button based on a condition
            })}
          />
        }
        <Stack.Screen name="LoginScreen" component={LoginScreen}
          options={{
            title: 'Login',
            headerShown: false,
          }} />
        <Stack.Screen
  name="Bottom"
  component={BottomScreen}
  options={({ navigation }) => ({
    title: t('app-logo'),
    headerShown: true,
    headerBackVisible: false,
    headerLeft: () => null,
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="bell" size={25} color="white" />
        </View>
      </TouchableOpacity>
    ),
  })}
/>

        <Stack.Screen
          name="ElectricityBill"
          component={ElectricityBill}
          options={({ navigation }) => ({
            title: 'ELECTRICITY BILL',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="WaterUsageBill"
          component={WaterUsageBill}
          options={({ navigation }) => ({
            title: 'WATER BILL',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="ChangePass"
          component={ChangePass}
          options={({ navigation }) => ({
            title: 'Alter your password',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="ElectricityBillList"
          component={ElectricityBillList}
          options={({ navigation }) => ({
            title: 'Electricity Bill',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="WaterUsageBillList"
          component={WaterUsageBillList}
          options={({ navigation }) => ({
            title: 'Water Bill List',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="BillDetails"
          component={BillDetails}
          options={({ navigation }) => ({
            title: 'Electricity Bill Details',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="RewardScreen"
          component={RewardScreen}
          options={({ navigation }) => ({
            title: 'Reward',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="BillDetailsWater"
          component={BillDetailsWater}
          options={({ navigation }) => ({
            title: 'Water Bill Details',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="ComplainScreen"
          component={ComplainScreen}
          options={({ navigation }) => ({
            title: 'Complain',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />


        <Stack.Screen
          name="AboutApp"
          component={AboutApp}
          options={({ navigation }) => ({
            title: 'About App',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />


        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={({ navigation }) => ({
            title: 'Get in Touch',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="TestPage"
          component={TestPage}
          options={({ navigation }) => ({
            title: 'TestPage',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="WaterSavingTips"
          component={WaterSavingTips}
          options={({ navigation }) => ({
            title: 'Water Saving Tips',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="WaterUsageTracker"
          component={WaterUsageTracker}
          options={({ navigation }) => ({
            title: 'Water Usage Tracker',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={({ navigation }) => ({
            title: 'Notification',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="WaterReport"
          component={WaterReport}
          options={({ navigation }) => ({
            title: 'Water Report',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />
        <Stack.Screen
          name="TableData"
          component={TableData}
          options={({ navigation }) => ({
            title: 'Table Report',
            headerShown: true,
            // headerBackVisible: false, // Optionally hide the back button based on a condition
            headerLeft: () => null, // Optionally hide the back button based on a condition
          })}
        />







      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
