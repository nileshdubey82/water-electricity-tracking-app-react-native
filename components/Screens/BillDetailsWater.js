/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import { BarChart } from 'react-native-chart-kit';

const WaterBillDetails = () => {
    // Sample data for the chart
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                data: [10, 20, 15, 25, 30, 18], // Sample water consumption data
                color: (opacity = 1) => `rgba(100, 255, 218, ${opacity})`, // Custom color for the water consumption chart
            },
        ],
    };

    const [filter, setFilter] = useState('all');

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                data: [10, 20, 15, 25, 30, 18],
            },
        ],
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Water Bill Details</Text>

            {/* Line Chart */}
            <View style={styles.chartContainer}>
                <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width - 50}
                    height={250}
                    yAxisLabel={'L'}
                    yAxisSuffix={''}
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726',
                        },
                    }}
                />
            </View>

            {/* Filter */}
            <Picker
                selectedValue={filter}
                style={styles.filter}
                onValueChange={(itemValue) => setFilter(itemValue)}
            >
                <Picker.Item label="All" value="all" />
                <Picker.Item label="Jan" value="jan" />
                <Picker.Item label="Feb" value="feb" />
                {/* Add more options as needed */}
            </Picker>

            {/* Bar Chart */}
            <View style={styles.chartContainer}>
                <BarChart
                    style={{ marginTop: 20, padding: 10 }}
                    data={data}
                    width={Dimensions.get('window').width - 50}
                    height={220}
                    yAxisLabel={'L'}
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                />
            </View>

            {/* Table View */}
            <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Month</Text>
                    <Text style={styles.tableHeader}>Usage (L)</Text>
                    <Text style={styles.tableHeader}>Cost (₹)</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableData}>Jan</Text>
                    <Text style={styles.tableData}>300</Text>
                    <Text style={styles.tableData}>60</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableData}>Feb</Text>
                    <Text style={styles.tableData}>320</Text>
                    <Text style={styles.tableData}>64</Text>
                </View>
                {/* Add more rows as needed */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    chartContainer: {
        marginBottom: 20,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
    },
    filter: {
        height: 50,
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color: 'black',
        elevation: 3,
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 60,
        elevation: 5,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    tableHeader: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: 'black',
    },
    tableData: {
        flex: 1,
        textAlign: 'center',
        color: 'black',
    },
});

export default WaterBillDetails;
