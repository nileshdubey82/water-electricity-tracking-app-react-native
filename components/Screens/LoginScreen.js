/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Animated,
    Easing,
    Alert,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';

export default function LoginScreen(props) {
    const [loading, setLoading] = React.useState(false);
    const [mob, setMob] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [animation] = React.useState(new Animated.Value(0));
    const { t } = useTranslation();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);

        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(animation, {
                toValue: 0,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const animatedIconStyles = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                }),
            },
        ],
    };

    const handleLogin = async () => {
        if (!mob || !pass) {
            Alert.alert('Validation Error', 'Please enter mobile number and password.');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                'https://sihfinal.000webhostapp.com/SIHFINALPAGE/app_api/loginCheck.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_email: mob,
                        user_password: pass,
                    }),
                }
            );

            const responseData = await response.json();

            if (responseData.status === '1' && responseData.data) {
                // Login successful
                console.log('Login successful:', responseData);

                const userData = responseData.data;

                // Store user details in AsyncStorage
                await AsyncStorage.setItem('loginId', mob);
                await AsyncStorage.setItem('loginUsername', userData.user_name);
                await AsyncStorage.setItem('loginUserId', userData.user_id.toString());
                await AsyncStorage.setItem('loginMobile', userData.user_mobile);
                await AsyncStorage.setItem('loginEmail', userData.user_email);

                // Navigate to the next screen
                props.navigation.navigate('Bottom');
            } else {
                // Login failed
                console.log('Login failed:', responseData.message);
                Alert.alert('Login Failed', responseData.message);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            Alert.alert('Login Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <View style={styles.firstView}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../Images/logo.png')}
                />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>
                    {t('app-logo')}
                </Text>

            </View>
            <View style={styles.secondView}>
                {/* <Text style={styles.textFooter}>Mobile Number</Text> */}
                <View style={styles.actionCheck}>
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome name="user-secret" color="#05375a" size={20} />
                    </View>
                    <View
                        style={{
                            flex: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TextInput
                            placeholder="Your UserName"
                            placeholderTextColor="gray"
                            keyboardType="Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={value => setMob(value)}
                            value={mob}
                        />
                    </View>
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {mob !== '' ? (
                            <Feather name="check-circle" color="black" size={22} />
                        ) : (
                            <Text />
                        )}
                    </View>
                </View>
                <View style={styles.actionCheck}>
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome name="lock" color="#05375a" size={20} />
                    </View>
                    <View
                        style={{
                            flex: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TextInput
                            placeholder="Your Password"
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={value => setPass(value)}
                            value={pass}
                            secureTextEntry={!showPassword}
                        />
                    </View>
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.visibilityButton}
                            onPress={togglePasswordVisibility}>
                            <Animated.View style={animatedIconStyles}>
                                <FontAwesome
                                    name={showPassword ? 'eye-slash' : 'eye'}
                                    size={24}
                                    color="#000000"
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row-reverse', width: '90%' }}>
                    <Text
                        style={{
                            color: '#427ffe',
                            textAlign: 'right',
                        }}>
                        Forget Your Password ?
                    </Text>
                </TouchableOpacity>

                {/* {pass !== '' && mob !== '' ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )} */}
                <TouchableOpacity
                    style={styles.button}
                    // onPress={() => props.navigation.navigate('Bottom')}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>{t('login-text')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tinyLogo: {
        width: 140,
        height: 140,
    },
    firstView: {
        flex: 1,
        backgroundColor: '#427ffe',
        borderColor: 'white',
        borderBottomStartRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10, // Shadow depth for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.3, // Shadow opacity for iOS
        shadowRadius: 3, // Shadow radius for iOS
    },
    secondView: {
        flex: 1.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '80%',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
    },
    button: {
        width: '70%',
        backgroundColor: '#427ffe', // Customize button color
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 5, // Shadow depth for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.3, // Shadow opacity for iOS
        shadowRadius: 3, // Shadow radius for iOS
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        // borderRadius: 20,
        backgroundColor: 'white', // Customize button color
        paddingBottom: 5,
        elevation: 3, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        color: 'black',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'center',
        alignContent: 'center',
    },
    actionCheck: {
        width: '90%',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        // borderRadius: 20,
        backgroundColor: 'white', // Customize button color
        paddingBottom: 5,
        elevation: 3, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        color: 'black',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'center',
        alignContent: 'center',
    },
    textFooter: {
        color: '#05375a',
        fontSize: 18,
        fontWeight: 'bold',
    },
    visibilityButton: {
        // padding: 5,
    },
});
