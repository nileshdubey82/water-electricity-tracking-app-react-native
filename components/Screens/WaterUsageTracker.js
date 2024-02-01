/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Button, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';
const WaterUsageTracker = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [limitExceeded, setLimitExceeded] = useState(false);

    useEffect(() => {
        // Fetch live data from the server when the component mounts
        fetchData();
    }, []);

    // Dummy data for testing, replace this with actual fetching logic
    const dummyData = {
        monthlyData: [
            { name: 'January', usage: 500, target: 1000 },
            { name: 'February', usage: 600, target: 1000 },
            { name: 'March', usage: 1100, target: 1000 },
            { name: 'April', usage: 950, target: 1000 },
            { name: 'May', usage: 1200, target: 1000 },
            { name: 'June', usage: 1500, target: 1000 },
            { name: 'July', usage: 400, target: 1000 },
            { name: 'August', usage: 988, target: 1000 },
            { name: 'September', usage: 650, target: 1000 },
            { name: 'October', usage: 800, target: 1000 },
            { name: 'November', usage: 333, target: 1000 },
            { name: 'December', usage: 985, target: 1000 },
        ],
    };

    const colors = [
        '#FF5733',
        '#e52b50',
        '#5733FF',
        '#003f5c',
        '#2f4b7c',
        '#665191',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#9966cc',
        '#4b5320',
    ]; // Assign fixed colors according to each month

    const fetchData = async () => {
        try {
            // Commenting out the online fetching for now, use dummy data instead
            // const response = await fetch('your_server_url/getWaterUsageYearly.php');
            // const data = await response.json();
            // setMonthlyData(data.monthlyData);

            // Use dummy data for testing
            setMonthlyData(dummyData.monthlyData);

            // Check if any month's usage exceeds the limit
            const exceeded = dummyData.monthlyData.some(
                (month) => month.usage > month.target
            );
            setLimitExceeded(exceeded);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateTotalUsage = () => {
        const totalUsage = monthlyData.reduce((acc, month) => acc + month.usage, 0);
        Alert.alert(
            `Total Water Usage, You used ${totalUsage} liters of water this year.`
        );
    };

    const getArrowIcon = (usage, target) => {
        const arrowColor = usage > target ? '#ff0000' : '#00ff00';
        return (
            <Icon
                name={usage > target ? 'arrow-up' : 'arrow-down'}
                size={20}
                color={arrowColor}
                style={{ marginRight: 10 }}
            />
        );
    };
    // 00ff00 style={{marginRight: 10}}

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Water Usage Tracker (Yearly)</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={monthlyData.map((month, index) => ({
                        name: month.name,
                        usage: month.usage,
                        color: colors[index % colors.length], // Use a fixed color for each month
                    }))}
                    width={300}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#1a1a1a', // Set a dark background color
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Set text color to white
                    }}
                    accessor="usage"
                    paddingLeft="60"
                    absolute
                />
            </View>

            <View style={styles.legendContainer}>
                {monthlyData.map((month, index) => (
                    <View key={index} style={styles.legendItem}>
                        <Text
                            style={{ color: colors[index % colors.length], marginRight: 10, marginLeft: 10, fontSize: 20 }}>
                            {getArrowIcon(month.usage, month.target)}
                        </Text>
                        <Text
                            style={{ color: colors[index % colors.length], marginRight: 10, marginLeft: 0, fontSize: 20 }}>{month.usage} liters in
                        </Text>
                        <Text
                            style={{ color: colors[index % colors.length], flexShrink: 1 }}>
                            {month.name}
                        </Text>
                    </View>
                ))}
            </View>

            {limitExceeded && (
                <Text style={{ color: 'red', marginBottom: 10 }}>
                    Warning: Your water usage exceeds the limit in one or more months!
                </Text>
            )}

            <Text style={{ fontSize: 20, color: '#000' }}>
                YEARLY USAGE AND TARGET
            </Text>

            <Text style={{ fontSize: 16, marginBottom: 5, color: '#FF5733' }}>
                🔺 Above target | 🔻 Below target
            </Text>

            {/* <Button title="Calculate Total Usage" onPress={calculateTotalUsage} /> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingBottom: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#000',
    },
    chartContainer: {
        marginBottom: 20,
        width: '100%',
    },
    legendContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default WaterUsageTracker;
