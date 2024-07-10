import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [currentLocation, setCurrentLocation] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [isFromCurrentLocation, setIsFromCurrentLocation] = useState(true);
  const [isToCurrentLocation, setIsToCurrentLocation] = useState(false);
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(true);
  const [numBikes, setNumBikes] = useState(1);
  const [fromLat, setFromLat] = useState(null);
  const [fromLon, setFromLon] = useState(null);
  const [toLat, setToLat] = useState(null);
  const [toLon, setToLon] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [searchFlag, setSearchFlag] = useState(false);
  const [secondSearchFlag, setSecondSearchFlag] = useState(false);
  const [startStation, setStartStation] = useState([]);
  const [endStation, setEndStation] = useState([]);
  const [walkingRoute1, setWalkingRoute1] = useState([]);
  const [cyclingRoute, setCyclingRoute] = useState([]);
  const [walkingRoute2, setWalkingRoute2] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = location.coords;
      setCurrentPosition({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      });
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (address.length > 0) {
        const formattedAddress = `${address[0].city}, ${address[0].street}`;
        setCurrentLocation(formattedAddress); // Always update current location
        if (fromLocation === "") {
          setFromLocation(formattedAddress); // Only set fromLocation if it's still the initial empty string
          setFromLat(latitude); // Set fromLat to the current latitude
          setFromLon(longitude); // Set fromLon to the current longitude
        }
      }
    })();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        currentPosition,
        setCurrentPosition,
        fromLocation,
        setFromLocation,
        toLocation,
        setToLocation,
        isFromCurrentLocation,
        setIsFromCurrentLocation,
        isToCurrentLocation,
        setIsToCurrentLocation,
        isFromFocused,
        setIsFromFocused,
        isToFocused,
        setIsToFocused,
        currentLocation,
        setCurrentLocation,
        numBikes,
        setNumBikes,
        fromLat,
        setFromLat,
        fromLon,
        setFromLon,
        toLat,
        setToLat,
        toLon,
        setToLon,
        arrivalTime,
        setArrivalTime,
        searchFlag,
        setSearchFlag,
        secondSearchFlag,
        setSecondSearchFlag,
        startStation,
        setStartStation,
        endStation,
        setEndStation,
        walkingRoute1,
        setWalkingRoute1,
        walkingRoute2,
        setWalkingRoute2,
        cyclingRoute,
        setCyclingRoute,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
