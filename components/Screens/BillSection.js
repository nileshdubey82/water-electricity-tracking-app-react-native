/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

export default function BillSection({ navigation }) {
    const bills = [
        { id: 'ElectricityBillList', name: 'Electricity Bill' },
        { id: 'WaterUsageBillList', name: 'Water Bill' },
    ];

    const handleBillPress = (bill) => {
        navigation.navigate(bill.id);
    };

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const renderBillItem = ({ item }) => (
        <Animated.View style={{}}>
            <TouchableOpacity
                onPress={() => {
                    handleBillPress(item);
                    fadeIn();
                }}
                style={{
                    backgroundColor: '#1874D2', // Custom background color
                    padding: 10,
                    margin: 10,
                    borderRadius: 10, // Rounded corners
                    alignItems: 'center',
                    borderColor: '#fff', // Border color
                    borderWidth: 2, // Border width
                    shadowColor: '#000', // Shadow color
                    shadowOffset: { width: 0, height: 2 }, // Shadow offset
                    shadowOpacity: 0.3, // Shadow opacity
                    shadowRadius: 4, // Shadow radius
                    elevation: 5, // Android elevation
                }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{item.name}</Text>
            </TouchableOpacity>
        </Animated.View>
    );


    return (
        <View>
            <Text>BillSection</Text>
            {bills.map((bill) => (
                <View key={bill.id}>{renderBillItem({ item: bill })}</View>
            ))}
        </View>
    );
}
