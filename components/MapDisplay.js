import React, { useEffect, useState, useContext, useRef } from "react";
import { StyleSheet, View, Dimensions, Alert, Text } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import polyline from "@mapbox/polyline";
import { REACT_APP_MAPBOX_API_KEY } from "@env";
import { useNavigation } from '@react-navigation/native';
import LocationContext from "../components/LocationContext";
import * as Location from 'expo-location';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function MapDisplay({ location = null }) {
  const {
    setTimeToDestination,
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
  const [initialLoad, setInitialLoad] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [userHeading, setUserHeading] = useState(0);

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
    const deltaLat = (maxLat - minLat) * 1.2;
    const deltaLon = (maxLon - minLon) * 1.2;

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
      return;
    }

    if (
      !coordinates.every(
        (coord) => coord.longitude != null && coord.latitude != null
      )
    ) {
      console.log("Some coordinates are not properly defined");
      return;
    }

    if (
      fromLat === prevFromLat.current &&
      fromLon === prevFromLon.current &&
      toLat === prevToLat.current &&
      toLon === prevToLon.current &&
      startStation === prevStartStation.current &&
      endStation === prevEndStation.current
    ) {
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
    setMapRegion(newRegion);

    const totalDuration =
      walkingRoute1.duration + cyclingRoute.duration + walkingRoute2.duration;
    setTimeToDestination(totalDuration);

    prevFromLat.current = fromLat;
    prevFromLon.current = fromLon;
    prevToLat.current = toLat;
    prevToLon.current = toLon;
    prevStartStation.current = startStation;
    prevEndStation.current = endStation;
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const snapToRoute = (currentLocation) => {
    const { latitude, longitude } = currentLocation;
    let closestPoint = null;
    let minDistance = Infinity;

    const routeCoordinates = [...walkingRoute1, ...cyclingRoute, ...walkingRoute2];

    for (let i = 0; i < routeCoordinates.length - 1; i++) {
      const start = routeCoordinates[i];
      const end = routeCoordinates[i + 1];

      const d1 = getDistance(latitude, longitude, start.latitude, start.longitude);
      const d2 = getDistance(latitude, longitude, end.latitude, end.longitude);

      const distance = Math.min(d1, d2);

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = distance === d1 ? start : end;
      }
    }

    if (closestPoint) {
      setUserLocation({
        latitude: closestPoint.latitude,
        longitude: closestPoint.longitude,
      });
    }
  };

  useEffect(() => {
    let watchId;

    const startWatchingPosition = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        watchId = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 1,
            timeInterval: 1000,
          },
          (location) => {
            const { latitude, longitude, heading } = location.coords;
            snapToRoute({ latitude, longitude });
            setUserHeading(heading);
          }
        );
      } catch (error) {
        console.error('Error watching position:', error);
      }
    };

    startWatchingPosition();

    return () => {
      if (watchId) {
        watchId.remove();
      }
    };
  }, [walkingRoute1, cyclingRoute, walkingRoute2]);

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

    if (location) {
      setMapRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
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

  return (
    <View style={styles.container}>
      {mapRegion && (
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          showsUserLocation={false}
          onRegionChangeComplete={(region) => setMapRegion(region)}
        >
          <Polyline
            coordinates={cyclingRoute}
            strokeWidth={5}
            strokeColor="black"
          />
          <Polyline
            coordinates={walkingRoute2}
            strokeWidth={3}
            strokeColor="red"
            lineDashPattern={[5, 10]}
          />
          <Polyline
            coordinates={walkingRoute1}
            strokeWidth={3}
            strokeColor="red"
            lineDashPattern={[5, 10]}
          />

          {userLocation && (
            <Marker
              coordinate={userLocation}
              anchor={{ x: 0.5, y: 0.5 }}
              rotation={userHeading}
            >
              <View style={styles.userMarker}>
                <View style={[styles.userArrow, { transform: [{ rotate: `${userHeading}deg` }] }]} />
              </View>
            </Marker>
          )}

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
    transform: [{ translateY: -25}]
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
  userMarker: {
    width: 40,  // Increased from 20 to 30
    height: 40, // Increased from 20 to 30
    borderRadius: 25, // Half of width/height
    backgroundColor: 'white', // Changed from blue to white
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, // Added a border
    borderColor: 'gray', // Border color
  },
  userArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,  // Slightly increased from 5
    borderRightWidth: 10, // Slightly increased from 5
    borderBottomWidth: 25, // Slightly increased from 10
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black', // Changed from white to blue
  },
});
