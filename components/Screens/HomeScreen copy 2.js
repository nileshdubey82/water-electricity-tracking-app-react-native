/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Dashboard = () => {
  const [ampere, setAmpere] = useState(10);
  const [voltage, setVoltage] = useState(220);
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Simulate dynamic data changes every 2 seconds
    const interval = setInterval(() => {
      setAmpere(Math.floor(Math.random() * 20) + 5);
      setVoltage(Math.floor(Math.random() * 100) + 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Animated.View style={[styles.box, { transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }) }] }]}>
          <Text>Ampere: {ampere} A</Text>
        </Animated.View>
        <Animated.View style={[styles.box, { transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }) }] }]}>
          <Text>Voltage: {voltage} V</Text>
        </Animated.View>
        <View style={styles.box}>
          <Text>Total Units (Day): 30 kWh</Text>
        </View>
        <View style={styles.box}>
          <Text>Total Units (Month): 800 kWh</Text>
        </View>
        <View style={styles.box}>
          <Text>Consumption: 50 liters</Text>
        </View>
      </View>
      
      <LineChart
        data={{
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          datasets: [
            {
              data: [voltage, voltage + 10, voltage - 5, voltage + 15, voltage + 5, voltage - 10, voltage + 8, voltage - 3, voltage + 12, voltage - 8],
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: [ampere, ampere - 3, ampere + 2, ampere - 1, ampere + 4, ampere - 2, ampere + 3, ampere - 5, ampere + 6, ampere - 4],
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: ['Voltage', 'Ampere'],
        }}
        width={350}
        height={200}
        chartConfig={{
          backgroundColor: '#f0f0f0',
          backgroundGradientFrom: '#f0f0f0',
          backgroundGradientTo: '#f0f0f0',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  box: {
    width: 150,
    height: 50,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  chart: {
    marginTop: 20,
  },
});

export default Dashboard;
