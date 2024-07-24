import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function ExtraInfoCard({ header, title, stationBikes, stationDocks }) {
  const bikePercentage = (stationBikes / stationDocks) * 100;
  const emptySpaces = stationDocks - stationBikes;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * bikePercentage) / 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stationHeader}>{header} Station:</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.circleContainer}>
        <Svg height="150" width="150" viewBox="0 0 120 120">
          <Circle
            cx="60"
            cy="60"
            r={radius}
            stroke="white"
            strokeWidth="14"
            fill="none"
          />
          <Circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#ED0100"
            strokeWidth="14"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
            transform="rotate(-90 60 60)"
          />
        </Svg>
        <View style={styles.infoContainer}>
          <Text style={styles.infoBikes}>{stationBikes} BIKES</Text>
          <Text style={styles.infoSpaces}>{emptySpaces} SPACES</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 23 / 100,
    width: screenWidth * 90 / 100,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  header: {
    flexDirection: 'column',
    width: '55%',
  },
  title: {
    color: 'white',
    fontSize: 17,
    width: '100%',
    fontWeight: '500',
    marginBottom: 5,
  },
  stationHeader: {
    color: 'white',
    fontSize: 24,
    width: '90%',
    fontWeight: '500',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  infoBikes: {
    color: '#ED0100',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSpaces: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
