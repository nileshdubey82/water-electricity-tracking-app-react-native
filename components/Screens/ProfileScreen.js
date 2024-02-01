/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
export default function ProfileScreen(props) {
    const [userDetails, setUserDetails] = useState(null);
    const { t } = useTranslation();
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Retrieve user_id from AsyncStorage
                const userLoginId = await AsyncStorage.getItem('loginUserId');

                const response = await fetch('https://sihfinal.000webhostapp.com/SIHFINALPAGE/app_api/getProfiles.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: userLoginId,
                    }),
                });

                const data = await response.json();

                if (data.status === '1') {
                    setUserDetails(data.data);
                } else {
                    console.error('Error fetching user details:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = async () => {
        // Clear AsyncStorage on logout
        await AsyncStorage.clear();
        props.navigation.navigate('LoginScreen');
        console.log('Logged out');
    };

    const handleChangePassword = () => {
        props.navigation.navigate('ChangePass');
        console.log('Change password');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../Images/profile_pic.jpg')}
                style={styles.profileImage}
            />
            <View style={styles.profileCard}>
                {userDetails && (
                    <>
                        <Text style={styles.profileText}>{t('pro-name')}: {userDetails.user_name}</Text>
                        <Text style={styles.profileText}>
                        {t('pro-mobile')}: {userDetails.user_mobile}
                        </Text>
                        <Text style={styles.profileText}>
                        {t('pro-address')}: {userDetails.user_address}
                        </Text>
                        <Text style={styles.profileText}>
                        {t('pro-device-id')}: {userDetails.Esp_id}
                        </Text>
                        {/* Include other user details as needed */}
                    </>
                )}
            </View>
            <TouchableOpacity
                style={styles.changePasswordButton}
                onPress={handleChangePassword}>
                <Text style={styles.changePasswordButtonText}>{t('pro-changepass')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>{t('pro-logout')}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    profileCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
    },
    profileText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black',
    },
    changePasswordButton: {
        backgroundColor: '#ff9800',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 10,
    },
    changePasswordButtonText: {
        color: 'white',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
