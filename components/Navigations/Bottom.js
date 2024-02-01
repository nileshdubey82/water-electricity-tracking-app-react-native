/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, TouchableOpacity, View, Linking, Share } from 'react-native';

//screens
import HomeScreen from '../Screens/HomeScreen';
import BillSection from '../Screens/BillSection';
import ProfileScreen from '../Screens/ProfileScreen';
import Menu from '../Screens/Menu';
// import ProfileScreen from '../Screens/ProfileScreen';
// import FeeDetailsPage from '../Screens/FeesScreen';

const Tab = createMaterialBottomTabNavigator();

function BottomScreen() {



    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            activeColor="black"
            inactiveColor="#FFFFFF"
            barStyle={{
                backgroundColor: '#427ffe',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: 'hidden',
            }}
            sceneContainerStyle={styles.sceneContainer}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                    tabBarLabelPosition: 'beside-icon',
                }}
            />
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="menu" color={color} size={26} />
                    ),
                    tabBarLabelPosition: 'beside-icon',
                }}
            />
            <Tab.Screen
                name="BillSection"
                component={BillSection}
                options={{
                    tabBarLabel: 'Payment',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="currency-inr" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Your Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />

            {/* <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                    tabBarButtonStyle: {
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                    },
                }}
            />
            <Tab.Screen
                name="Fees"
                component={FeeDetailsPage}
                options={{
                    tabBarLabel: 'Fee',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-cash" color={color} size={26} />
                    ),
                    tabBarButtonStyle: {
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                    },
                }}
            /> */}

        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    sceneContainer: {
        backgroundColor: 'white', // Set the background color of the tab screen content
    },
    plusButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#FF0000', // Customize the background color of the plus button
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    tabBarButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareButton: {
        backgroundColor: '#FF0000', // Customize the background color of the share buttons
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
    },
});

export default BottomScreen;
