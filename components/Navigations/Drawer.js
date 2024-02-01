/* eslint-disable prettier/prettier */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../Screens/HomeScreen'; // Replace with your actual screen components

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        // <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            {/* Add more screens as needed */}
        </Drawer.Navigator>
        // </NavigationContainer>
    );
};

export default DrawerNavigator;
