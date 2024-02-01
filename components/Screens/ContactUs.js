/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';

const ContactUsScreen = () => {
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInDown" duration={1000}>
                <Text style={styles.header}>Contact Us</Text>
            </Animatable.View>

            <Animatable.View style={styles.contactInfo} animation="fadeInUp" duration={1000}>
                <Text style={styles.infoTitle}>Location</Text>

                <Text style={styles.infoText}>
                    Sanjay Rungta Group of Institutions- (SRGI), Bhilai
                </Text>
            </Animatable.View>

            <Animatable.View style={styles.contactInfo} animation="fadeInUp" duration={1000}>
                <Text style={styles.infoTitle}>Mobile Number</Text>
                <Text style={styles.infoText}>+916267751993</Text>
            </Animatable.View>

            <Animatable.View style={styles.contactInfo} animation="fadeInUp" duration={1000}>
                <Text style={styles.infoTitle}>Email</Text>
                <Text style={styles.infoText}>nileshdubey060@gmail.com</Text>
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    contactInfo: {
        marginBottom: 30,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black',
    },
    mapContainer: {
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 12,
    },
    map: {
        flex: 1,
    },
    infoText: {
        fontSize: 16,
        color: 'black',
    },
});

export default ContactUsScreen;
