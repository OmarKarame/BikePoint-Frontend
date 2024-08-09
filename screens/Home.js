import React, { useState } from 'react';
import { StyleSheet, Keyboard, View, TouchableWithoutFeedback, StatusBar, Text, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import LocationSearchContainer from '../components/LocationSearchContainer';
import AdditionalContentContainer from '../components/AdditionalContentContainer';
import bikeSpotLogo from '../assets/images/bikespot-logo.png';
import GetMeSomewhereButton from '../components/GetMeSomewhereButton';
import svgHomeScreenHeaderDesign from '../assets/svgs/svgHomeScreenHeaderDesign';
import { SvgXml } from 'react-native-svg';
import bikeImage from '../assets/images/santander-bike-home.png';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Home() {
  const navigation = useNavigation();

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
        <View style={styles.headerDesign}>
          <SvgXml
            xml={svgHomeScreenHeaderDesign}
            style={styles.headerDesignSVG}
          />
        </View>
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
    alignItems: 'center',
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
    top: screenHeight * 8 / 100,
  },
  headerDesign: {
    position: 'absolute',
    zIndex: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  headerSection: {
    width: screenWidth * 90 / 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    transform: [{ translateY: -screenWidth * 5 / 100 }],
  },
  headerTextSection: {
    width: '74%',
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
    marginTop: '3%',
    letterSpacing: -1,
    marginLeft: 15,
  },
  headerLogoSection: {
    width: '17%',
    alignItems: 'flex-end',
  },
  headerLogo: {
    height: 70,
    width: 70,
    marginTop: 4,
  },
  mainImage: {
    height: 280,
    marginTop: 100,
    aspectRatio: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -5,
    transform: [{ translateX: -screenWidth * 22 / 100 }],
  },
  mainBikeImage: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
    opacity: 1,
  },
  footer: {
    width: screenWidth,
    position: 'absolute',
    bottom: 40,
    left: 0,
  },
  bikeImage: {
    width: screenWidth * 1.09,
    height: screenHeight * 30 / 100,
    opacity: 1,
  },
});
