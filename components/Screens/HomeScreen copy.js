/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Easing, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const [ampere, setAmpere] = useState('');
  const [voltage, setVoltage] = useState('');
  const [waterCumsuption, setwaterCumsuption] = useState(0);
  const [totalUnitDay, settotalUnitDay] = useState(0);
  const [totalUnitMonth, settotalUnitMonth] = useState(0);
  const [slideAnim] = useState(new Animated.Value(0));
  const [ampereData, setAmpereData] = useState([ampere]);
  const [voltageData, setVoltageData] = useState([voltage]);
  const [ampereTimestamps, setAmpereTimestamps] = useState([new Date()]);
  const [voltageTimestamps, setVoltageTimestamps] = useState([new Date()]);
  const [loginId, setLoginId] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const [loginMobile, setLoginMobile] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    const fetchLoginData = async () => {
      try {
        const storedLoginId = await AsyncStorage.getItem('loginId');
        const storedLoginUsername = await AsyncStorage.getItem('loginUsername');
        const storedLoginUserId = await AsyncStorage.getItem('loginUserId');
        const storedLoginMobile = await AsyncStorage.getItem('loginMobile');
        const storedLoginEmail = await AsyncStorage.getItem('loginEmail');

        if (storedLoginId) {
          setLoginId(storedLoginId);
        }
        if (storedLoginUsername) {
          setLoginUsername(storedLoginUsername);
        }
        if (storedLoginUserId) {
          setLoginUserId(storedLoginUserId);
        }
        if (storedLoginMobile) {
          setLoginMobile(storedLoginMobile);
        }
        if (storedLoginEmail) {
          setLoginEmail(storedLoginEmail);
        }
      } catch (error) {
        console.error('Error fetching login data from AsyncStorage:', error);
      }
    };

    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://sihfinal.000webhostapp.com/SIHFINALPAGE/app_api/getDashboardData.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            esp_id: 'ESP101', // Replace with your actual esp_id
          }),
        });

        const data = await response.json();

        if (data.status === '1') {
          const { live_data } = data;

          setAmpere(live_data.Amp);
          setVoltage(live_data.Volt);

          setAmpereData(prevData => [...prevData, live_data.Amp]);
          setVoltageData(prevData => [...prevData, live_data.Volt]);

          setAmpereTimestamps(prevData => [...prevData, new Date()]);
          setVoltageTimestamps(prevData => [...prevData, new Date()]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchLoginData();
    fetchDashboardData();

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <Animated.View style={[styles.box, { transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }) }] }]}>
          <Text style={styles.TextVlues}>
            AMPERE{'\n'} {ampere > 100 ? <Text style={{ color: 'red', fontWeight: 'bold' }}>{ampere}</Text> : <Text>{ampere}</Text>} A
          </Text>
        </Animated.View>
        <Animated.View style={[styles.box, { transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }) }] }]}>
          <Text style={styles.TextVlues}>
            Voltage{'\n'}
            {voltage > 220 ? <Text style={{ color: 'red', fontWeight: 'bold' }}>{voltage}</Text> : <Text>{voltage}</Text>} V
          </Text>
        </Animated.View>
        <View style={styles.box}>
          <Text style={styles.TextVlues}>Total Units (Day){'\n'} {totalUnitDay} kWh</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.TextVlues}>Total Units (Month){'\n'} {totalUnitMonth} kWh</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.TextVlues}>Water Consumption{'\n'} {waterCumsuption} liters</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>Ampere Graph</Text>
          <LineChart
            data={{
              labels: ampereTimestamps.slice(-5).map(date => date.toLocaleTimeString()),
              datasets: [
                {
                  data: ampereData.slice(-5),
                  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
              legend: ['Ampere'],
            }}
            width={390}
            height={200}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '9',
                strokeWidth: '3',
                stroke: '#ffa726',
              },
            }}
            bezier
          />
        </View>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>Voltage Graph</Text>
          <LineChart
            data={{
              labels: voltageTimestamps.slice(-5).map(date => date.toLocaleTimeString()),
              datasets: [
                {
                  data: voltageData.slice(-5),
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
              legend: ['Voltage'],
            }}
            width={390}
            height={200}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 0,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  box: {
    width: 150,
    height: 90,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    color: '#333',
  },
  chartContainer: {
    justifyContent: 'space-around',
    marginTop: 20,
  },
  chart: {
    width: 350,
    marginVertical: 20,
    elevation: 8,
    backgroundColor: '#fff',
  },
  chartTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  background: {
    padding: 20,
    backgroundColor: '#427ffe',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TextVlues: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Dashboard;
