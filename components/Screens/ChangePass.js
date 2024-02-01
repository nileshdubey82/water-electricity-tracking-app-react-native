/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message'; // Import the toast message library
import { Alert } from 'react-native';

const ChangePass = ({ navigation }) => {
    const [mobilenumber, setmobilenumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        // Assuming you have a function to handle changing the password
        // After successfully changing the password, trigger the success toast
        // and navigate to the next screen if necessary
        // For example:
        // changePassword()
        //   .then(() => {
        Toast.show({
            type: 'success',
            text1: 'Password Changed',
            text2: 'Your password has been successfully changed!',
        });
        // Alert.alert("Nilesh Dubey");
        //     navigation.navigate('NextScreen');
        //   })
        //   .catch((error) => {
        //     // Handle error
        //   });
    };

    // useEffect(() => {
    //     // Simulated successful password change for demonstration purposes
    //     handleChangePassword();
    // }, []);

    return (
        <View style={styles.container}>
            {/* <Image
                source={require('./changepass.png')}
                style={{ width: 350, height: 350 }}
            /> */}
            <LottieView
                style={{ width: 350, height: 350 }}
                source={require('../Images/changepass.json')} // Replace with the path to your sad animation JSON file
                autoPlay
                loop
            />
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <Text style={styles.title}>Alter your password</Text>
            <TextInput
                style={styles.input}
                placeholder="ENTER MOBILE NUMBER"
                placeholderTextColor="gray"
                value={mobilenumber}
                onChangeText={setmobilenumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Provide a new password"
                placeholderTextColor="gray"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Align your password"
                placeholderTextColor="gray"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleChangePassword} // Call the function when the button is pressed
            >
                <Text style={styles.buttonText}>Make a Modification</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    input: {
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 50,
        fontSize: 16,
        elevation: 3, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        marginBottom: 10,
        color: 'black',
    },
    button: {
        width: '100%',
        backgroundColor: '#1874D2', // Customize button color
        borderRadius: 5,
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
    },
    alertStyles: {
        container: {
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#009387',
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        message: {
            fontSize: 16,
            marginBottom: 20,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        logo: {
            width: 10,
            height: 50,
        },
    },
});

export default ChangePass;
