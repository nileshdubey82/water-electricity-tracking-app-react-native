/* eslint-disable prettier/prettier */
// MonthlyBillScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, StyleSheet } from 'react-native';

const MonthlyBillScreen = ({ navigation }) => {
    const [bills, setBills] = useState([
        { month: 'January', amount: 100, isPaid: false },
        { month: 'February', amount: 120, isPaid: true },
        { month: 'March', amount: 90, isPaid: false },
        // Add more bill entries as needed
    ]);

    const [selectedBill, setSelectedBill] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePayBill = () => {
        if (selectedBill) {
            setBills(prevBills => prevBills.map(bill =>
                bill.month === selectedBill.month ? { ...bill, isPaid: true } : bill
            ));
            setModalVisible(true);
        }
    };

    const handlePrintBill = () => {
        if (selectedBill) {
            navigation.navigate('ElectricityBill', {
                month: selectedBill.month,
                amount: selectedBill.amount,
                // Add other details as needed
            });
        }
    };

    const handleViewBill = () => {
        setModalVisible(false);
        // Redirect to Bill page with value
        // You can use navigation here
        navigation.navigate('ElectricityBill', {
            month: selectedBill.month,
            amount: selectedBill.amount,
            // Add other details as needed
        });
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: 'black', fontSize: 25, borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 ,fontWeight:'bold'}}>Electricity Bill Payments</Text>
            <FlatList
                data={bills}
                keyExtractor={(item) => item.month}
                renderItem={({ item }) => (
                    <View style={styles.billItem}>
                        <Text style={styles.month}>{item.month}</Text>
                        <Text style={styles.amount}>Amount: {item.amount}</Text>
                        {item.isPaid ? (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('ElectricityBill', {
                                            month: item.month,
                                            amount: item.amount,
                                            // Add other details as needed
                                        });
                                    }}
                                    style={styles.printButton}
                                >
                                    <Text style={styles.buttonText}>Print Bill</Text>
                                </TouchableOpacity>
                                <Text style={styles.paid}>Paid</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedBill(item)
                                    handlePayBill()
                                }
                                }
                                style={styles.payButton}
                            >
                                <Text style={styles.payButtonText}>Pay Now</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Payment Successful!</Text>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={handleViewBill}
                        >
                            <Text style={styles.textStyle}>View Bill</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    billItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
    },
    month: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    amount: {
        fontSize: 16,
        color: 'black',
    },
    paid: {
        color: 'green',
        fontSize: 16,
    },
    payButton: {
        backgroundColor: '#FFD700',
        padding: 8,
        borderRadius: 5,
    },
    payButtonText: {
        fontSize: 16,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    printButton: {
        backgroundColor: '#2196F3',
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
        color: "black",
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MonthlyBillScreen;
