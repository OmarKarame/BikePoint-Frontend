import React, { useEffect, useState, useContext, useRef } from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import { REACT_APP_MAPBOX_API_KEY } from "@env";
import { useNavigation } from '@react-navigation/native';
import LocationContext from "../components/LocationContext";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function MapDisplay({ location }) {
  const {
    fromLocation,
    setFromLocation,
    toLocation,
    setToLocation,
    setArrivalTime,
    setFromLat,
    setFromLon,
    setToLat,
    setToLon,
    fromLat,
    fromLon,
    toLat,
    toLon,
    startStation,
    endStation,
    walkingRoute1,
    setWalkingRoute1,
    walkingRoute2,
    setWalkingRoute2,
    cyclingRoute,
    setCyclingRoute,
  } = useContext(LocationContext);

  const navigation = useNavigation();

  const [mapRegion, setMapRegion] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load

  // Store previous values of location and stations
  const prevFromLat = useRef(fromLat);
  const prevFromLon = useRef(fromLon);
  const prevToLat = useRef(toLat);
  const prevToLon = useRef(toLon);
  const prevStartStation = useRef(startStation);
  const prevEndStation = useRef(endStation);

  const coordinates = [
    { longitude: fromLon, latitude: fromLat },
    { longitude: startStation?.lon, latitude: startStation?.lat },
    { longitude: endStation?.lon, latitude: endStation?.lat },
    { longitude: toLon, latitude: toLat },
  ];

  const calculateRegion = (coords) => {
    let minLat = coords[0].latitude;
    let maxLat = coords[0].latitude;
    let minLon = coords[0].longitude;
    let maxLon = coords[0].longitude;

    coords.forEach((coord) => {
      minLat = Math.min(minLat, coord.latitude);
      maxLat = Math.max(maxLat, coord.latitude);
      minLon = Math.min(minLon, coord.longitude);
      maxLon = Math.max(maxLon, coord.longitude);
    });

    const midLat = (minLat + maxLat) / 2;
    const midLon = (minLon + maxLon) / 2;
    const deltaLat = (maxLat - minLat) * 1.2; // Add 20% padding
    const deltaLon = (maxLon - minLon) * 1.2; // Add 20% padding

    return {
      latitude: midLat,
      longitude: midLon,
      latitudeDelta: Math.max(deltaLat, 0.02),
      longitudeDelta: Math.max(deltaLon, 0.02),
    };
  };

  const fetchDirections = async (mode, start, end) => {
    if (!start || !end) {
      console.log("Coordinates not defined");
      return null;
    }
    const coordinateString = `${start.longitude},${start.latitude};${end.longitude},${end.latitude}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${coordinateString}?alternatives=true&continue_straight=true&geometries=polyline&language=en&overview=full&steps=true&access_token=${REACT_APP_MAPBOX_API_KEY}`;
    console.log("api call");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Network response was not ok:", response.statusText); // Log response status
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!data.routes || data.routes.length === 0) {
        console.error("No routes found:", data); // Log the data for debugging
        throw new Error("No routes found");
      }
      return {
        geometry: data.routes[0].geometry,
        duration: data.routes[0].duration,
      };
    } catch (error) {
      console.error("Error fetching directions:", error);
      return null;
    }
  };

  const loadRoute = async () => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    if (
      !startStation?.lat ||
      !startStation?.lon ||
      !endStation?.lat ||
      !endStation?.lon
    ) {
      console.log("Stations not fully defined");
      return;
    }

    // Check if all coordinates are valid
    if (
      !coordinates.every(
        (coord) => coord.longitude != null && coord.latitude != null
      )
    ) {
      console.log("Some coordinates are not properly defined");
      return;
    }

    // Check if any relevant variables have changed
    if (
      fromLat === prevFromLat.current &&
      fromLon === prevFromLon.current &&
      toLat === prevToLat.current &&
      toLon === prevToLon.current &&
      startStation === prevStartStation.current &&
      endStation === prevEndStation.current
    ) {
      console.log("No changes in coordinates or stations");
      return;
    }

    const walkingRoute1 = await fetchDirections(
      "walking",
      coordinates[0],
      coordinates[1]
    );
    const cyclingRoute = await fetchDirections(
      "cycling",
      coordinates[1],
      coordinates[2]
    );
    const walkingRoute2 = await fetchDirections(
      "walking",
      coordinates[2],
      coordinates[3]
    );

    if (!walkingRoute1 || !cyclingRoute || !walkingRoute2) {
      console.error("Failed to fetch route");
      return;
    }

    const decodedWalkingRoute1 = polyline
      .decode(walkingRoute1.geometry)
      .map((point) => ({ latitude: point[0], longitude: point[1] }));
    const decodedCyclingRoute = polyline
      .decode(cyclingRoute.geometry)
      .map((point) => ({ latitude: point[0], longitude: point[1] }));
    const decodedWalkingRoute2 = polyline
      .decode(walkingRoute2.geometry)
      .map((point) => ({ latitude: point[0], longitude: point[1] }));

    setWalkingRoute1(decodedWalkingRoute1);
    setCyclingRoute(decodedCyclingRoute);
    setWalkingRoute2(decodedWalkingRoute2);

    // Combine all points to calculate the new region
    const allCoords = [
      ...decodedWalkingRoute1,
      ...decodedCyclingRoute,
      ...decodedWalkingRoute2,
    ];
    const newRegion = calculateRegion(allCoords);
    setMapRegion(newRegion);

    const totalDuration =
      walkingRoute1.duration + cyclingRoute.duration + walkingRoute2.duration;
    const arrivalTime = new Date();
    arrivalTime.setSeconds(arrivalTime.getSeconds() + totalDuration);
    setArrivalTime(arrivalTime);

    // Update previous values
    prevFromLat.current = fromLat;
    prevFromLon.current = fromLon;
    prevToLat.current = toLat;
    prevToLon.current = toLon;
    prevStartStation.current = startStation;
    prevEndStation.current = endStation;
  };

  useEffect(() => {
    // console.log("Start Station:", startStation.commonName);
    // console.log("End Station:", endStation.commonName);
    // if ( startStation != undefined &&
    //      endStation != undefined && toLon != null && toLat != null && fromLat != null && fromLon != null
    //     ) {
    //   console.log('test 1');
    //   console.log(walkingRoute1);
      loadRoute();
    // } else {
    //   // Set fromLocation and toLocation and their coordinates to empty strings and null respectively
    //   console.log('test 2');
    //   // Create popup that says "Please search for a location" and an OK button that takes me to navigation.navigate('Search', {})
    //   Alert.alert(
    //     "Location Required",
    //     "Please search for a location",
    //     [
    //       {
    //         text: "OK",
    //         onPress: () => navigation.navigate('Search', {})
    //       }
    //     ]
    //   );
    // }
  }, [
    fromLat,
    fromLon,
    toLat,
    toLon,
    startStation.commonName,
    endStation.commonName,
  ]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        initialRegion={{
          latitude: location?.latitude || 51.514156,
          longitude: location?.longitude || -0.12070277,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        <Polyline
          coordinates={walkingRoute1}
          strokeWidth={3}
          strokeColor="red"
          lineDashPattern={[5, 10]}
        />
        <Polyline
          coordinates={cyclingRoute}
          strokeWidth={5}
          strokeColor="blue"
        />
        <Polyline
          coordinates={walkingRoute2}
          strokeWidth={3}
          strokeColor="red"
          lineDashPattern={[5, 10]}
        />
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
