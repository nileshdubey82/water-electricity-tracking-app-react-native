/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

const AboutScreen = (props) => {
    return (
        <View style={styles.container}>
            <Animatable.View
                style={styles.header}
                animation="fadeInDown"
                duration={1000}
            >
                <Text style={styles.headerText}>About Us</Text>
            </Animatable.View>
            <Animatable.View
                style={styles.aboutContent}
                animation="fadeInUp"
                duration={1000}
            >
                <Text style={styles.aboutText}>
                    Welcome to our eco-friendly living app! We're dedicated to helping you lead a sustainable lifestyle while earning rewards for your efforts.
                </Text>
            </Animatable.View>
            <Animatable.View
                style={styles.noteContainer}
                animation="fadeInUp"
                duration={1000}
            >
                <Text style={styles.noteTitle}>Note</Text>
                <Text style={styles.noteText}>
                    By conserving water and electricity, you not only contribute to a greener planet but also earn valuable reward points! Learn more about usage guidelines in the Rewards section.
                </Text>
            </Animatable.View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // Add any action you want to perform when the button is pressed
                    props.navigation.navigate('ContactUs');
                }}
            >
                <Text style={styles.buttonText}>Contact Us</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1874D2', // Change header color to #1874D2
    },
    aboutContent: {
        marginBottom: 20,
    },
    aboutText: {
        fontSize: 16,
        color: '#333',
    },
    noteContainer: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black',
    },
    noteText: {
        fontSize: 16,
        color: '#666',
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
});

export default AboutScreen;
