/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import LottieView from 'lottie-react-native';

const UniqueLoader = (props) => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.uniqueActivityIndicatorWrapper}>
          <LottieView
            source={require('../Images/loader.json')} // Update with your Lottie file path
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      </View>
    </Modal>
  );
};

export default UniqueLoader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  uniqueActivityIndicatorWrapper: {
    backgroundColor: '#fff', // Set your unique color
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the Lottie animation
  },
  lottie: {
    width: 80, // Adjust the size as needed
    height: 80, // Adjust the size as needed
  },
});
