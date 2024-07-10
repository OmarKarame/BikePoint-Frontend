import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Keyboard, View, TouchableWithoutFeedback, StatusBar, Text, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LocationSearchContainer from '../components/LocationSearchContainer';
import AdditionalContentContainer from '../components/AdditionalContentContainer';
import bikeSpotLogo from '../assets/images/bikespot-logo.png'
import * as Font from 'expo-font';
import GetMeSomewhereButton from '../components/GetMeSomewhereButton';
import santanderBike from '../assets/images/santander-bike.png';
import bikeImage from '../assets/images/homepage-bike-image.png';
import LocationContext from "../components/LocationContext";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Home() {
  const navigation = useNavigation();

  // const {
  //   setToLocation,
  //   setToLat,
  //   setToLon,
  //   setFromLat,
  //   setFromLon,
  //   toLon
  // } = useContext(LocationContext);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setToLocation('');
  //     setToLat(null);
  //     setToLon(null);
  //     setFromLat(null);
  //     setToLat(null);
  //     console.log("Home page loaded: " + toLon);

  //     // Optional clean-up function
  //     return () => {
  //       // Any cleanup actions if needed when the screen goes out of focus
  //     };
  //   }, [])
  // );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <LinearGradient
          colors={['white', '#F5F5F5', '#E1E1E1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0.0, 0.75, 1.0]}
          style={styles.innerShadow}
        />
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <View style={styles.headerTextSection}>
              <Text style={styles.headerText}>
                BikePoint
              </Text>
            </View>
            <View style={styles.headerLogoSection}>
              <Image source={bikeSpotLogo} style={styles.headerLogo} />
            </View>
          </View>
          <View style={styles.mainImage}>
            <Image source={bikeImage} style={styles.mainBikeImage} />
          </View>
          <GetMeSomewhereButton />
          <AdditionalContentContainer />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    width: screenWidth,
    alignItems: 'center'
  },
  innerShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
  bikespotLogo: {
    height: 200,
    width: 200,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: screenHeight * 8/100,
  },
  headerSection: {
    width: screenWidth * 90/100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    transform: [{ translateY: - screenWidth *5/100}]
  },
  headerTextSection:{
    width: '74%',
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  headerText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '600',
    marginTop: '3%',
    letterSpacing: -1,
  },
  headerBlob: {
    width: 50,
    height: '92%',
    backgroundColor: '#ED0000',
    borderRadius: 20,
    marginRight: 4
  },
  headerLogoSection: {
    width: '17%',
    alignItems: 'flex-end'
  },
  headerLogo: {
    height: 70,
    width: 70,
    marginTop: 4,
  },
  mainImage: {
    height: 350,
    width: screenWidth * 90/100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    transform: [{ translateY: - screenWidth * 4/100}]
  },
  mainBikeImage: {
    height: '100%',
    width: '100%',
  },
  footer: {
    width: screenWidth,
    position: 'absolute',
    bottom: 40,
    left: 0,
  },
  bikeImage: {
    width: screenWidth*1.09,
    height: screenHeight * 30 /100,
    opacity: 1
  }
});
