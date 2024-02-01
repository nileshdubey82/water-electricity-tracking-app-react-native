/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MenuScreen(props) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("ElectricityBillList");
                }}>
                    <Icon name="dollar" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>Pay Electricity Bill</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("BillDetails");
                }}>
                    <Icon name="file-text" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>Electricity Bill Details</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("WaterUsageBillList");
                }}>
                    <Icon name="dollar" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>Pay Water Bill</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("BillDetailsWater");
                }}>
                    <Icon name="file-text" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}> Water Bill Details</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("RewardScreen");
                }}>
                    <Icon name="money" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>Reward Point</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("ComplainScreen");
                }}>
                    <Icon name="exclamation-triangle" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>Complaint About</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("WaterSavingTips");
                }}>
                    <Icon name="lightbulb-o" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>Water Saving Tips</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("WaterUsageTracker");
                }}>
                    <Icon name="bar-chart-o" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>Water Usage Tracker</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("AboutApp");
                }}>
                    <Icon name="user" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>About App</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("ContactUs");
                }}>
                    <Icon name="phone" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>Contact Us</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("WaterReport");
                }}>
                    <Icon name="folder" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>Water Report</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {
                    props.navigation.navigate("TableData");
                }}>
                    <Icon name="folder" size={30} color="#1874D2" />
                    <Text style={styles.buttonText}>TABLE DATA</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.buttonContainer} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        width: 150,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#1874D2',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
