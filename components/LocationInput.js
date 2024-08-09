import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity, Keyboard } from 'react-native'
import React, { useRef, useContext } from 'react'
import ButtonComponent from './ButtonComponent';
import LocationContext from '../components/LocationContext';

const screenWidth = Dimensions.get('window').width;

export default function LocationInput({
  value,
  locationInputHandler,
  placeholderText,
  icon,
  handlePress,
  buttonText,
  buttonColor,
  buttonInfoColor,
  text,
  isCurrentLocation,
  setIsCurrentLocation,
  image,
  onFocus,
  onBlur,
}) {
  const {
    fromLocation,
    toLocation,
    setFromLocation,
    setToLocation,
    setCurrentLocation,
    setIsFromFocused,
    setIsToFocused,
    isFromFocused,
    isToFocused,
    currentLocation
  } = useContext(LocationContext);

  const toggleCurrentLocation = () => {
    setIsCurrentLocation(false)
    if (isToFocused){
      setIsFromFocused(true)
      setIsToFocused(false)
      setFromLocation('')
    } else {
      setIsFromFocused(false)
      setIsToFocused(true)
      setToLocation('')
    }

  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Image source={image} style={styles.image}/>
      {isCurrentLocation ?
        <TouchableOpacity style={styles.currentLocationDisplay} onPress={toggleCurrentLocation}>
          <Text style={styles.primaryText}>Current Location</Text>
          <Text style={styles.secondaryText}>{currentLocation}</Text>
        </TouchableOpacity>
        :
        <TextInput
          value={value}
          style={styles.input}
          onChangeText={locationInputHandler}
          placeholder={placeholderText}
          placeholderTextColor={"grey"}
          onFocus={onFocus}
          onBlur={onBlur}
          editable={!isCurrentLocation}
        />
      }
      <ButtonComponent
        text={buttonText}
        icon={icon}
        buttonColor={buttonColor}
        handlePress={handlePress}
        buttonInfoColor={buttonInfoColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: screenWidth * 90/100,
    // backgroundColor: '#C3DEE7',
    backgroundColor: 'white',
    // borderColor: '#EC0000',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    justifyContent: 'space-between'
  },
  currentLocationDisplay: {
    width: '60%',
    height: '100%',
    justifyContent: 'center'
  },
  primaryText: {
    width: '100%',
    fontSize: 16,
    letterSpacing: -0.43,
    fontWeight: '500'
  },
  secondaryText: {
    width: '100%',
    fontSize: 10,
    letterSpacing: -0.43,
    fontWeight: '500',
    color: 'grey',
    marginLeft: 1
  },
  text: {
    marginLeft: 10,
    fontWeight: '700',
    width: '10%'
  },
  input: {
    width: '60%',
    fontSize: 16,
    height: '100%',
    letterSpacing: -0.43,
    fontWeight: '500'
  },
  image: {
    height: 20,
    width: 20,
    marginHorizontal: -20
  }
})
