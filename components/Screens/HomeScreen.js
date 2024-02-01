/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Easing, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Rect } from 'react-native-svg';
const Dashboard = () => {
  const [ampere, setAmpere] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [watt, setwatt] = useState(0);
  const [temp, settemp] = useState(0);
  const [waterConsumption, setWaterConsumption] = useState(0);
  const [waterConsumptionDay, setWaterConsumptionDay] = useState(10);
  const [totalUnitDay, setTotalUnitDay] = useState(0);
  const [totalUnitMonth, setTotalUnitMonth] = useState(0);
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
  const [textColor, setTextColor] = useState('green');

  const [capacity, setcapacity] = useState(135);
  const [filllevel, setfilllevel] = useState(0);
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
          const { live_data, total_day_consumption, total_month_consumption, water_consumption,water_consumptionDaily } = data;

          // Function to round a float value to two decimal places
          const roundToTwoDecimalPlaces = (value) => Math.round(value * 100) / 100;

          setAmpere(roundToTwoDecimalPlaces(live_data.Amp));
          setVoltage(roundToTwoDecimalPlaces(live_data.Volt));
          settemp(roundToTwoDecimalPlaces(live_data.Temp));
          setWaterConsumption(roundToTwoDecimalPlaces(total_day_consumption));
          setfilllevel(roundToTwoDecimalPlaces(total_day_consumption));
          setTotalUnitDay(roundToTwoDecimalPlaces(total_day_consumption));
          setWaterConsumptionDay(roundToTwoDecimalPlaces(total_day_consumptionvs));
          setTotalUnitMonth(roundToTwoDecimalPlaces(total_month_consumption));
          setwatt(roundToTwoDecimalPlaces(live_data.Volt * live_data.Amp));

          // Assuming live_data.Amp and live_data.Volt are numbers
          setAmpereData(prevData => [...prevData, roundToTwoDecimalPlaces(live_data.Amp)]);
          setVoltageData(prevData => [...prevData, roundToTwoDecimalPlaces(live_data.Volt)]);

          setAmpereTimestamps(prevData => [...prevData, new Date()]);
          setVoltageTimestamps(prevData => [...prevData, new Date()]);
          applyColorLogic(135, water_consumption);
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

  const applyColorLogic = (currentLevel, capacity) => {
    const fillPercentage = (currentLevel / capacity) * 100;

    // Color based on water level
    if (fillPercentage <= 33.3) {
      setTextColor("green");
    } else if (fillPercentage <= 66.6) {
      setTextColor("yellow");
    } else if (fillPercentage <= 100) {
      setTextColor("orange");
    } else {
      setTextColor("red");
    }
  };

  let textStyle;

  
  const tankWidth = 100;
  const tankHeight = 300;
  const fillPercentage = (filllevel / capacity) * 100;
  const tankFillHeight = (fillPercentage / 100) * tankHeight;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxContainer}>
        <Animated.View style={[styles.box, { transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }) }] }]}>
          <Text style={styles.TextValues}>
            AMPERE{'\n'} {ampere > 100 ? <Text style={{ color: 'red', fontWeight: 'bold' }}>{ampere}</Text> : <Text>{ampere}</Text>} A
          </Text>
        </Animated.View>
        <Animated.View style={[styles.box, { transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }) }] }]}>
          <Text style={styles.TextValues}>
            Voltage{'\n'}
            {voltage > 220 ? <Text style={{ color: 'red', fontWeight: 'bold' }}>{voltage}</Text> : <Text>{voltage}</Text>} V
          </Text>
        </Animated.View>
        <View style={styles.box}>
          <Text style={styles.TextValues}>Watt{'\n'} {watt} kWh</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.TextValues}>Total Units (Day){'\n'} {totalUnitDay} kWh</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.TextValues}>Total Units (Month){'\n'} {totalUnitMonth} kWh</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.TextValues}>Water Consumption (Monthly){'\n'} {waterConsumption} liters</Text>
        </View>
        <View style={styles.box}>
          <Text style={[styles.TextValues, textStyle]}>
            Water Consumption (Daily){'\n'} {waterConsumptionDay} liters
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={[styles.TextValues]}>
            Temperature{'\n'} {temp} Celsius
          </Text>
        </View>
      </View>
      <View>
      <Svg height={tankHeight} width={tankWidth}>
        {/* Tank */}
        <Rect x="0" y="0" width={tankWidth} height={tankHeight} fill="#87CEEB" />

        {/* Water Level */}
        <Rect
          x="0"
          y={tankHeight - tankFillHeight}
          width={tankWidth}
          height={tankFillHeight}
          fill="#427ffe"
        />

        {/* Tank Outline */}
        <Rect
          x="0"
          y="0"
          width={tankWidth}
          height={tankHeight}
          fill="transparent"
          stroke="#000"
          strokeWidth="2"
        />
      </Svg>

      {/* Display the current water level percentage */}
      <Text style={{ textAlign: 'center', marginTop: 10, color: "#427ffe" }}>
        Water Level: {fillPercentage.toFixed(2)}%
      </Text>
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
  TextValues: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  greenText: {
    color: 'green',
    // Additional styles for the green range
  },
  yellowText: {
    color: 'yellow',
    // Additional styles for the yellow range
  },
  redText: {
    color: 'red',
    // Additional styles for the red range
  },
  orangeText: {
    color: 'orange',
    // Additional styles for the yellow range
  },
});

export default Dashboard;
