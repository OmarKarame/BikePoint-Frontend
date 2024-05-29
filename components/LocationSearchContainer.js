import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import * as Location from 'expo-location';
import LocationContext from '../components/LocationContext';
import LocationInput from '../components/LocationInput';
import svgWhiteSwap from '../assets/svgs/svgWhiteSwap';
import svgWhiteMagnifyingGlass from '../assets/svgs/svgWhiteMagnifyingGlass';
import currentLocationIcon from '../assets/images/current-location.png';
import locationIcon from '../assets/images/location-icon.png';
import svgWhiteBackButton from '../assets/svgs/svgWhiteBackButton';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default function LocationSearchContainer({ backgroundColor, addRecent }) {
  const {
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
  } = useContext(LocationContext);

  const navigation = useNavigation();

  const handleFocusFrom = () => {
    setIsFromFocused(true);
    setIsToFocused(false);
  };

  const handleBlurFrom = () => {
    setIsFromFocused(false);
  };

  const handleFocusTo = () => {
    setIsToFocused(true);
    setIsFromFocused(false);
  };

  const handleBlurTo = () => {
    setIsToFocused(false);
  };

  const handleSetFromCurrentLocation = () => {
    setIsFromCurrentLocation(false)
  }

  const handleSetToCurrentLocation = () => {
    setIsToCurrentLocation(false)
  }

  const fromLocationInputHandler = (event) => {
    setFromLocation(event)
    setIsFromCurrentLocation(false)
  }

  const toLocationInputHandler = (event) => {
    setToLocation(event)
    setIsToCurrentLocation(false)
  }

  const handleLocationSwap = () => {
    const newFromLocation = toLocation;
    const newToLocation = fromLocation;

    setFromLocation(newFromLocation);
    setToLocation(newToLocation);
    if(isFromCurrentLocation == true){
      setIsFromCurrentLocation(false)
      setIsToCurrentLocation(true)
    }
    else if (isToCurrentLocation == true) {
      setIsFromCurrentLocation(true)
      setIsToCurrentLocation(false)
    }
    setIsFromFocused(!isFromFocused);
    setIsToFocused(!isToFocused);
  }

  const handleSearch = () => {
    if (fromLocation && toLocation !== '') {
      addRecent(toLocation)
      navigation.navigate('Map', {})
    }
    else {
      Alert.alert(
        'Please select a location',
        'You need to select a location to perform the search.',
        [{ text: 'OK', onPress: () => console.log('OK pressed') }]
      );
    }
  }

  const dynamicStyles = StyleSheet.create({
    container: {
      width: screenWidth,
      paddingTop: backgroundColor ? screenHeight * 12 / 100 : 0,
      alignItems: 'center',
      borderRadius: 20,
      transform: backgroundColor ? [{ translateY: - screenHeight * 7 / 100 }] : [{translateY: 0}],
      backgroundColor: backgroundColor || 'transparent',
      paddingBottom: backgroundColor ? 20 : 0,
      shadowColor: backgroundColor ? '#EC0000' : 'transparent',
      shadowOffset: backgroundColor ? { width: -10, height: -15 } : 0,
      shadowOpacity: backgroundColor ? 0.9 : 0,
      shadowRadius: backgroundColor ? 30 : 0,
      zIndex: 22
    },
    innerShadow: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '230%',
      width: '100%',
      borderRadius: 20,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <LinearGradient
        colors={['#af2f3f', '#500d1f']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.0, 0.95]}
      />
      <SvgXml
        xml={svgWhiteBackButton}
        width="25"
        height="25"
        style={styles.icon}
        onPress={() => navigation.navigate('Home', {})}
      />
      <LocationInput
        value={fromLocation}
        locationInputHandler={fromLocationInputHandler}
        placeholderText={'From'}
        icon={svgWhiteSwap}
        handlePress={handleLocationSwap}
        buttonColor={'rgba(0,0,0, 1)'}
        buttonInfoColor={'white'}
        text={'Start'}
        isCurrentLocation={isFromCurrentLocation}
        setIsCurrentLocation={handleSetFromCurrentLocation}
        image={isFromCurrentLocation ? currentLocationIcon : locationIcon}
        onFocus={handleFocusFrom}
        onBlur={handleBlurFrom}
      />
      <LocationInput
        value={toLocation}
        locationInputHandler={toLocationInputHandler}
        placeholderText={'To'}
        handlePress={handleSearch}
        buttonText={'Go'}
        buttonColor={'rgba(236,3,0,1)'}
        text={'End'}
        isCurrentLocation={isToCurrentLocation}
        setIsCurrentLocation={handleSetToCurrentLocation}
        image={isToCurrentLocation ? currentLocationIcon : locationIcon}
        onFocus={handleFocusTo}
        onBlur={handleBlurTo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: screenHeight * 8/100,
    left: screenWidth * 5/100,
  }
})
