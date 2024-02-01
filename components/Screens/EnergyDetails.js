/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EnergyDetails = ({ waterConsumption, ampere, voltage, meterInfo }) => {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.title}>Water Consumption</Text>
                <Text style={styles.detail}>Consumption: {waterConsumption} gallons</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Electricity Information</Text>
                <Text style={styles.detail}>Ampere: {ampere} A</Text>
                <Text style={styles.detail}>Voltage: {voltage} V</Text>
                <Text style={styles.detail}>Meter Info: {meterInfo}</Text>
            </View>
            {/* Add more details as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 3,
    },
    section: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detail: {
        fontSize: 16,
        marginBottom: 4,
    },
});

export default EnergyDetails;
