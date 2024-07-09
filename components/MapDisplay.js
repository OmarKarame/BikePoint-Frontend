// import { StyleSheet, Text, View, Dimensions } from 'react-native'
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { useEffect, useState } from 'react';
// import * as Location from 'expo-location';
// import React from 'react'

// const screenHeight = Dimensions.get('window').height
// const screenWidth = Dimensions.get('window').width

// export default function MapDisplay({ location }) {
//   // console.log(location.latitude);
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         region={{
//           latitude: location?.latitude || 0,
//           longitude: location?.longitude || 0,
//           latitudeDelta: 0.005,
//           longitudeDelta: 0.005,
//         }}
//         showsUserLocation={true}
//       >
//         {/*
//             I can use this piece of code to put a marker where the users home is once it's set

//         {location && (
//           <Marker
//             coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//             title="My Location"
//           />
//         )} */}
//       </MapView>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     height: screenHeight * 82/100,
//     width: screenWidth,
//     ...StyleSheet.absoluteFillObject,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   }
// })


import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import { REACT_APP_MAPBOX_API_KEY } from '@env';
import LocationContext from '../components/LocationContext';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function MapDisplay({ location }) {
  const { setArrivalTime } = useContext(LocationContext);
  const [walkingRoute1, setWalkingRoute1] = useState([]);
  const [cyclingRoute, setCyclingRoute] = useState([]);
  const [walkingRoute2, setWalkingRoute2] = useState([]);

  const coordinates = [
    { longitude: -0.179909, latitude: 51.512329 },
    { longitude: -0.179668, latitude: 51.511654 },
    { longitude: -0.080189, latitude: 51.531202 },
    { longitude: -0.076262, latitude: 51.533402 }
  ];

  const fetchDirections = async (mode, start, end) => {
    const coordinateString = `${start.longitude},${start.latitude};${end.longitude},${end.latitude}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${coordinateString}?alternatives=true&annotations=duration&continue_straight=true&exclude=ferry&geometries=polyline&language=en&overview=full&steps=true&access_token=${REACT_APP_MAPBOX_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return {
        geometry: data.routes[0].geometry,
        duration: data.routes[0].duration
      };
    } catch (error) {
      console.error('Error fetching directions:', error);
      return null;
    }
  };

  const getRoute = async (mode, start, end) => {
    try {
      const route = await fetchDirections(mode, start, end);
      if (!route) {
        console.error('Failed to fetch route');
        return { path: [], duration: 0 };
      }

      const path = polyline.decode(route.geometry).map(point => ({ latitude: point[1], longitude: point[0] }));
      return { path, duration: route.duration };
    } catch (error) {
      console.error('Error fetching directions:', error);
      return { path: [], duration: 0 };
    }
  };

  useEffect(() => {
    const loadRoutes = async () => {
      const walking1 = await getRoute('walking', coordinates[0], coordinates[1]);
      const cycling = await getRoute('cycling', coordinates[1], coordinates[2]);
      const walking2 = await getRoute('walking', coordinates[2], coordinates[3]);

      setWalkingRoute1(walking1.path);
      setCyclingRoute(cycling.path);
      setWalkingRoute2(walking2.path);

      const totalDuration = walking1.duration + cycling.duration + walking2.duration;
      const arrivalTime = new Date();
      arrivalTime.setSeconds(arrivalTime.getSeconds() + totalDuration);
      setArrivalTime(arrivalTime);
      console.log(arrivalTime);
    };
    loadRoutes();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location?.latitude || 51.514156,
          longitude: location?.longitude || -0.12070277,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {walkingRoute1.length > 0 && (
          <Polyline
            coordinates={walkingRoute1}
            strokeWidth={2}
            strokeColor="red"
            lineDashPattern={[6]}
          />
        )}
        {cyclingRoute.length > 0 && (
          <Polyline
            coordinates={cyclingRoute}
            strokeWidth={5}
            strokeColor="red"
          />
        )}
        {walkingRoute2.length > 0 && (
          <Polyline
            coordinates={walkingRoute2}
            strokeWidth={2}
            strokeColor="red"
            lineDashPattern={[6]}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.82,
    width: screenWidth,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
