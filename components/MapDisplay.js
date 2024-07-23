import React, { useEffect, useState, useContext, useRef } from "react";
import { StyleSheet, View, Dimensions, Alert, Text } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import polyline from "@mapbox/polyline";
import { REACT_APP_MAPBOX_API_KEY } from "@env";
import { useNavigation } from '@react-navigation/native';
import LocationContext from "../components/LocationContext";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function MapDisplay({ location = null }) {
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

  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    if (location) {
      setInitialRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      setInitialRegion({
        latitude: 51.514156,
        longitude: -0.12070277,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [location]);

  useEffect(() => {
    if (startStation != undefined && endStation != undefined) {
      loadRoute();
    } else {
      Alert.alert("Location Required", "Please search for a location", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Search", {}),
        },
      ]);
    }
  }, [
    fromLat,
    fromLon,
    toLat,
    toLon,
    startStation?.commonName,
    endStation?.commonName,
    location,
  ]);

  const fetchDirections = async (mode, start, end) => {
    if (!start || !end) {
      console.log("Coordinates not defined");
      return null;
    }
    const coordinateString = `${start.longitude},${start.latitude};${end.longitude},${end.latitude}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${coordinateString}?alternatives=true&continue_straight=true&geometries=polyline&language=en&overview=full&steps=true&access_token=${REACT_APP_MAPBOX_API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Network response was not ok:", response.statusText);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!data.routes || data.routes.length === 0) {
        console.error("No routes found:", data);
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
    if (
      !startStation?.lat ||
      !startStation?.lon ||
      !endStation?.lat ||
      !endStation?.lon
    ) {
      return;
    }

    const coordinates = [
      { longitude: fromLon, latitude: fromLat },
      { longitude: startStation?.lon, latitude: startStation?.lat },
      { longitude: endStation?.lon, latitude: endStation?.lat },
      { longitude: toLon, latitude: toLat },
    ];

    if (
      coordinates.some(
        (coord) => coord.longitude == null || coord.latitude == null
      )
    ) {
      console.log("Some coordinates are not properly defined");
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

    const allCoords = [
      ...decodedWalkingRoute1,
      ...decodedCyclingRoute,
      ...decodedWalkingRoute2,
    ];
    const newRegion = calculateRegion(allCoords);
    setInitialRegion(newRegion);

    const totalDuration =
      walkingRoute1.duration + cyclingRoute.duration + walkingRoute2.duration;
    const arrivalTime = new Date();
    arrivalTime.setSeconds(arrivalTime.getSeconds() + totalDuration);
    setArrivalTime(arrivalTime);
  };

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
    const deltaLat = (maxLat - minLat) * 1.2;
    const deltaLon = (maxLon - minLon) * 1.2;

    return {
      latitude: midLat,
      longitude: midLon,
      latitudeDelta: Math.max(deltaLat, 0.02),
      longitudeDelta: Math.max(deltaLon, 0.02),
    };
  };

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
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

          {/* Start Marker */}
          {startStation && (
            <Marker coordinate={{ latitude: fromLat, longitude: fromLon }}>
              <View style={styles.markerContainer}>
                <View style={styles.banner}>
                  <Text style={styles.bannerText}>Start</Text>
                </View>
                <View style={styles.pointer} />
              </View>
            </Marker>
          )}

          {/* End Marker */}
          {endStation && (
            <Marker coordinate={{ latitude: toLat, longitude: toLon }}>
              <View style={styles.markerContainer}>
                <View style={styles.banner}>
                  <Text style={styles.bannerText}>End</Text>
                </View>
                <View style={styles.pointer} />
              </View>
            </Marker>
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 84 / 100,
    transform: [{ translateY: -15 }],
    width: screenWidth,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    alignItems: 'center',
    transform: [{ translateY: -25 }]
  },
  banner: {
    backgroundColor: '#ED0100',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    elevation: 5,
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ED0100',
  },
});
