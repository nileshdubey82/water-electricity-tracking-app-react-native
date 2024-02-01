/* eslint-disable prettier/prettier */
// NotificationScreen.js

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const notificationsData = [
  {
    id: '1',
    title: 'Alert ! High Power Use ⚠️',
    message: 'You are using devices that consume More Electricity',
  },
  {
    id: '2',
    title: 'Daily Water Limit 😒',
    message: 'You have reached Daily Water Limit.',
  },
  {
    id: '3',
    title: 'Hurray ! 📢📢📢',
    message: 'You Got 50 reward Points,For consuming limited water',
  },
  // Add more notifications as needed
];

const NotificationScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  notificationContainer: {
    backgroundColor: '#fff',
    borderRadius: 10, 
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  notificationMessage: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default NotificationScreen;
