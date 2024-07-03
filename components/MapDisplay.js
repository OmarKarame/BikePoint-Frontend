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


import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import { REACT_APP_LOCATIONIQ_API_KEY } from '@env';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function MapDisplay({ location }) {
  const [routeCoordinates, setRouteCoordinates] = useState({
    route1: [],
    route2: [],
    route3: []
  });

  const start = { latitude: 51.511261, longitude: -0.180570 };
  const stop1 = { latitude: 51.513807, longitude: -0.123126 };
  const stop2 = { latitude: 51.511792, longitude: -0.127113 };
  const destination = { latitude: 51.507996, longitude: -0.12360937 };
  const modes = ["driving", "driving", "driving"];

  const fetchDirections = async (start, end, mode) => {
    const url = `https://us1.locationiq.com/v1/directions/${mode}/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?key=${REACT_APP_LOCATIONIQ_API_KEY}&steps=true&alternatives=true&geometries=polyline&overview=full`;
    try {
      const response = await fetch(url);
      const text = await response.text();
      const data = JSON.parse(text);
      return data.routes[0].geometry;
    } catch (error) {
      console.error('Error fetching directions:', error);
      return null;
    }
  };

  const getFullRoute = async () => {
    try {
      const route1 = await fetchDirections(start, stop1, modes[0]);
      const route2 = await fetchDirections(stop1, stop2, modes[1]);
      const route3 = await fetchDirections(stop2, destination, modes[2]);

      if (!route1 || !route2 || !route3) {
        console.error('Failed to fetch one or more routes');
        return {
          route1: [],
          route2: [],
          route3: []
        };
      }

      const decodedRoute1 = polyline.decode(route1).map(point => ({ latitude: point[0], longitude: point[1] }));
      const decodedRoute2 = polyline.decode(route2).map(point => ({ latitude: point[0], longitude: point[1] }));
      const decodedRoute3 = polyline.decode(route3).map(point => ({ latitude: point[0], longitude: point[1] }));

      return {
        route1: decodedRoute1,
        route2: decodedRoute2,
        route3: decodedRoute3
      };
    } catch (error) {
      console.error('Error fetching directions:', error);
      return {
        route1: [],
        route2: [],
        route3: []
      };
    }
  };

  useEffect(() => {
    const loadRoute = async () => {
      const fullRoute = await getFullRoute();
      setRouteCoordinates(fullRoute);
    };

    loadRoute();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location?.latitude || 51.514156,
          longitude: location?.longitude || -0.12070277,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="My Location"
          />
        )}
        {routeCoordinates.route1.length > 0 && (
          <Polyline
            coordinates={routeCoordinates.route1}
            strokeWidth={3}
            strokeColor="red"
            lineDashPattern={[2, 6]} // Dotted line pattern
          />
        )}
        {routeCoordinates.route2.length > 0 && (
          <Polyline
            coordinates={routeCoordinates.route2}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
        {routeCoordinates.route3.length > 0 && (
          <Polyline
            coordinates={routeCoordinates.route3}
            strokeWidth={3}
            strokeColor="red"
            lineDashPattern={[2, 6]} // Dotted line pattern
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
