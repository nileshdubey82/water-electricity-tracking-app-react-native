/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';

const ComplaintScreen = () => {
    const [category, setCategory] = useState('');
    const [details, setDetails] = useState('');
    const [problem, setProblem] = useState('');

    const submitComplaint = () => {
        console.log('Category:', category);
        console.log('Details:', details);
        console.log('Problem:', problem);
    };

    return (
        <View style={styles.container}>
            <Animatable.View style={styles.header} animation="fadeInDown" duration={1000}>
                <Text style={styles.headerText}>File a Complaint</Text>
            </Animatable.View>
            <Animatable.View style={styles.dropdownContainer} animation="fadeInUp" duration={1000}>
                <Text style={styles.label}>Category</Text>
                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Electricity" value="electricity" />
                    <Picker.Item label="Water" value="water" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            </Animatable.View>
            <Animatable.View style={styles.detailsContainer} animation="fadeInUp" duration={1000}>
                <Text style={styles.label}>Details</Text>
                <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    value={details}
                    onChangeText={(text) => setDetails(text)}
                />
            </Animatable.View>
            <Animatable.View style={styles.problemContainer} animation="fadeInUp" duration={1000}>
                <Text style={styles.label}>Describe the Problem</Text>
                <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    value={problem}
                    onChangeText={(text) => setProblem(text)}
                />
            </Animatable.View>
            <TouchableOpacity
                style={styles.button}
                onPress={submitComplaint}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0', // Background color for the entire screen
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Color for the header text
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    detailsContainer: {
        marginBottom: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff', // Background color for the text input
        color:'black'
    },
    problemContainer: {
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#1874D2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
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
});

export default ComplaintScreen;
