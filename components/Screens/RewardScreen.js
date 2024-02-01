/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

const RewardScreen = () => {
    const [electricityConsumed, setElectricityConsumed] = useState(30);
    const [waterConsumed, setWaterConsumed] = useState(50);

    const calculateRewards = (category, consumed) => {
        if (category === 'Electricity') {
            return Math.floor((100 - consumed) / 10);
        } else if (category === 'Water') {
            return Math.floor((100 - consumed) / 2);
        }
        return 0;
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1
        }/${currentDate.getFullYear()}`;

    const rewardsData = [
        {
            id: '1',
            category: 'Electricity',
            date: formattedDate,
            name: 'Energy Efficient Bulbs',
            points: calculateRewards('Electricity', electricityConsumed),
        },
        {
            id: '2',
            category: 'Electricity',
            date: formattedDate,
            name: 'Smart Thermostat',
            points: calculateRewards('Electricity', electricityConsumed),
        },
        {
            id: '3',
            category: 'Electricity',
            date: formattedDate,
            name: 'Solar Panels',
            points: calculateRewards('Electricity', electricityConsumed),
        },
        {
            id: '4',
            category: 'Water',
            date: formattedDate,
            name: 'Low-Flow Showerhead',
            points: calculateRewards('Water', waterConsumed),
        },
        {
            id: '5',
            category: 'Water',
            date: formattedDate,
            name: 'Rainwater Harvesting System',
            points: calculateRewards('Water', waterConsumed),
        },
        {
            id: '6',
            category: 'Water',
            date: formattedDate,
            name: 'Drip Irrigation System',
            points: calculateRewards('Water', waterConsumed),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>

            <Animatable.View style={styles.pointsContainer} animation="fadeIn" duration={1000} delay={500}>
                <View style={styles.pointsBox}>
                    <Icon name="star" size={24} color="#FFD700" />
                    <Text style={styles.pointsText}>100</Text>
                </View>
            </Animatable.View>
            <FlatList
                data={rewardsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Animatable.View
                        style={styles.rewardItem}
                        animation="bounceIn"
                        duration={1000}
                        delay={500}>
                        <Text style={styles.rewardCategory}>{item.category}</Text>
                        <Text style={styles.rewardDate}>{item.date}</Text>
                        <View style={styles.rewardDetail}>
                            <Icon name="star" size={20} color="#FFD700" />
                            <Text style={styles.rewardPoints}>{item.points}</Text>
                        </View>
                    </Animatable.View>
                )}
            />
            {/* <TouchableOpacity
        style={styles.usageButton}
        onPress={() => {
          setElectricityConsumed(electricityConsumed - 10);
          setWaterConsumed(waterConsumed - 5);
        }}>
        <Text style={styles.buttonText}>Simulate Usage</Text>
      </TouchableOpacity> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    header: {
        backgroundColor: '#1874D2',
        padding: 16,
        alignItems: 'center',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    pointsContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    pointsBox: {
        backgroundColor: '#1874D2',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#13528A', // Darker shade for border
    },
    pointsText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 8,
        marginLeft: 8,
        color: '#FFFFFF', // Text color
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    rewardItem: {
        marginBottom: 12,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    rewardCategory: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    rewardDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rewardPoints: {
        fontSize: 20,
        color: '#666',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    rewardDate: {
        color: 'black',
    },
});

export default RewardScreen;
