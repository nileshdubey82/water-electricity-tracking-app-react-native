/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const WaterSavingTips = () => {
  // Define an array of water-saving tips with descriptions
  const waterSavingTips = [
    {
      title: 'Shorten Shower Time',
      description: 'Take shorter showers to reduce water usage. Aim for 5-10 minutes.',
    },
    {
      title: 'Turn Off Faucet When Not in Use',
      description: 'Turn off the faucet while brushing teeth or soaping hands to save water.',
    },
    {
      title: 'Fix Leaks Promptly',
      description: 'Fix any leaks in faucets or pipes as soon as you notice them.',
    },
    {
      title: 'Use Full Loads',
      description: 'Wait until you have a full load before using the dishwasher or washing machine.',
    },
    {
      title: 'Collect Rainwater',
      description: 'Use rain barrels to collect rainwater for watering plants.',
    },
    {
      title: 'Water Plants Wisely',
      description: 'Water plants early in the morning or late in the evening to reduce evaporation.',
    },
    {
      title: 'Install Water-Saving Devices',
      description: 'Consider installing low-flow faucets and showerheads to save water.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.header}>Water Saving Tips</Text> */}
      {waterSavingTips.map((tip, index) => (
        <View key={index} style={styles.tipContainer}>
          <Text style={styles.tipTitle}>{tip.title}</Text>
          <Text style={styles.tipDescription}>{tip.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'#000',
  },
  tipContainer: {
     paddingTop: 30,
    paddingBottom: 30,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { x: 0, y: 10 },
    shadowOpacity: 1,
    borderBottomColor: '#427ffe',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    marginTop: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginStart:10,
    color: '#427ffe',
  },
  tipDescription: {
    fontSize: 16,
    marginStart:10,
    color:'#000',
  },
});

export default WaterSavingTips;