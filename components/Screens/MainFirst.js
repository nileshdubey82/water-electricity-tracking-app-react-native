/* eslint-disable prettier/prettier */
// FrontPage.js
import React, { useState } from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image, StatusBar, Modal, FlatList, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../services/LanguageContext';
import languagesList from '../../services/languagesList.json';
export default function FrontPage(props) {
    const [visible, setVisible] = useState(false);
    const { t, i18n } = useTranslation();
    const { changeLanguage } = useLanguage();

    const changeLng = (lng) => {
        i18n.changeLanguage(lng);
        changeLanguage(lng);
        setVisible(false);

        console.log('Available Languages:', Object.keys(languagesList));
        console.log('Native Names:', languagesList);
    };

    const availableLanguages = i18n.options.resources ? Object.keys(i18n.options.resources) : [];
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#427ffe" />
            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../Images/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.appName}>
                        {t('appName')}
                    </Text>
                </View>
            </View>
            <View style={styles.animationContainer}>
                <LottieView
                    source={require('../Images/login.json')}
                    autoPlay
                    loop
                    style={styles.animation}
                />
            </View>
            <View style={styles.usageContainer}>
                <Text style={styles.usageTitle}>
                    {t('track-your')}
                </Text>
                <Text style={styles.usageDesc}>
                    {t('main-desc')}
                </Text>
            </View>
            {/* Modal for language change */}
            <Modal transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
                <View style={styles.modalBackground}>
                    <View style={styles.languagesList}>
                        <FlatList
                            data={availableLanguages}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.languageButton}
                                    onPress={() => changeLng(item)}>
                                    <Text style={styles.lngName}>
                                        {languagesList[item] && languagesList[item].nativeName}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            {/* Button to change language */}
            <TouchableOpacity style={styles.changeLangButton} onPress={() => setVisible(true)}>
                <Text style={styles.changeLangButtonText}>{t('change-language')}</Text>
            </TouchableOpacity>
            {/* Login button */}
            <View style={styles.loginContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={() => {
                    // props.navigation.navigate('TestPage');
                    props.navigation.navigate('LoginScreen');
                }}>
                    <Text style={styles.loginButtonText}>{t('login-text')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#427ffe',
        padding: 8,
    },
    headerContainer: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
        alignContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        justifyContent: 'center',
        margin: 10,
        alignContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    appName: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 10,
    },
    animationContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 300,
        height: 350,
    },
    usageContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    usageTitle: {
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    usageDesc: {
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 15,
        padding: 25,
    },
    changeLangButton: {
        backgroundColor: '#6258e8',
        padding: 10,
        borderRadius: 3,
        alignSelf: 'center',
        marginVertical: 10,
    },
    changeLangButtonText: {
        color: 'white',
        fontSize: 16,
    },
    loginContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    languagesList: {
        width: '80%', // Adjust the width as needed
        backgroundColor: '#427ffe', // Background color of the modal
        borderRadius: 8,
        padding: 10,
        alignSelf: 'center', // Center the modal horizontally
    },
    languageButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    lngName: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,

    },
});
