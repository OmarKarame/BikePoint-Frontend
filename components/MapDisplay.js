import { StyleSheet, Text, View, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import React from 'react'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default function MapDisplay({ location }) {
  // console.log(location.latitude);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location?.latitude || 0,
          longitude: location?.longitude || 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
      >
        {/*
            I can use this piece of code to put a marker where the users home is once it's set

        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="My Location"
          />
        )} */}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 84/100,
    transform: [{ translateY: -15 }],
    width: screenWidth,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})
