// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import LocationContext from '../components/LocationContext';
import BikeInfoContainer from '../components/BikeInfoContainer';
import * as Location from 'expo-location';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default function Map() {
  const { fromLocation, toLocation, numBikes } = useContext(LocationContext);

  const [start, setStart] = useState(fromLocation);
  const [location, setLocation] = useState(null);
  const [startStation, setStartStation] = useState([]);
  const [endStation, setEndStation] = useState([]);
  const [error, setError] = useState('');

  async function getClosestStartStation(lat, lon) {
    try {
      const response = await fetch(`http://192.168.1.214:3000/getStartLocation?lat=${lat}&lon=${lon}&numBikes=${numBikes}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching closest stations:', error);
      throw error;
    }
  }

  async function getClosestEndStation(lat, lon) {
    try {
      const response = await fetch(`http://192.168.1.214:3000/getEndLocation?lat=${lat}&lon=${lon}&numBikes=${numBikes}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching closest stations:', error);
      throw error;
    }
  }

  const fetchStartStation = async (latitude, longitude) => {
    try {
      const data = await getClosestStartStation(latitude, longitude);
      setStartStation(data);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.log(error);
    }
  };

  const fetchEndStation = async (latitude, longitude) => {
    try {
      const data = await getClosestEndStation(latitude, longitude);
      setEndStation(data);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 2,
          },
          (newLocation) => {
            // newLocation might be null, so doing 'optional chaining'
            if (newLocation?.coords) {
              setLocation(newLocation.coords);
            }
          }
        );
      } catch (error) {
        console.error('Error in getting location foreground permission or location coordinates', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchStartStation(location.latitude, location.longitude);
      fetchEndStation(51.523350, -0.077440);
    }
  }, [location]); // Initial fetch once location is obtained

  useEffect(() => {
    if (toLocation && location) {
      fetchEndStation(51.523350, -0.077440);
      console.log('toLocation changed');
    }
  }, [toLocation]); // Fetch when toLocation changes

  useEffect(() => {
    if (fromLocation && location) {
      fetchStartStation(location.latitude, location.longitude);
      console.log('fromLocation changed');
    }
  }, [fromLocation]); // Fetch when fromLocation changes

  useEffect(() => {
    console.log(startStation);
  }, [startStation]);

  useEffect(() => {
    console.log(endStation);
  }, [endStation]);

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <LocationSearchContainer
            backgroundColor={'#F10000'}
            givenFromLocation={fromLocation}
            givenToLocation={toLocation}
          /> */}
          <Text style={styles.text}>From: {fromLocation}</Text>
          <Text style={styles.text}>To: {toLocation}</Text>
        </View>
        <View style={styles.mapDisplay}>
          <BikeInfoContainer
            location={location}
            startStation={startStation}
            endStation={endStation}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
      },
  innerShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
  header: {
    zIndex: 2,
    height: 150,
    width: screenWidth,
    backgroundColor: '#ED0000',
    display: 'flex',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: { width: -10, height: -15 },
    shadowColor: '#EC0000',
    shadowOpacity: 0.9,
    shadowRadius: 30,
  },
  mapDisplay: {
    flex: 1,
  },
  text: {
    paddingLeft: 20,
    paddingTop: 20,
    fontWeight: '700',
    color: 'white',
    fontSize: 16
  }
});
