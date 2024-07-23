import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Vibration } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import InsetShadow from 'react-native-inset-shadow';
import svgWhiteMagnifyingGlass from '../assets/svgs/svgWhiteMagnifyingGlass';

const screenWidth = Dimensions.get('window').width;

export default function GetMeSomewhereButton() {
  const [isPressed, setIsPressed] = useState(false);

  const navigation = useNavigation();

  const handlePressOut = () => {
    setIsPressed(false);
    Vibration.vibrate([0, 50, 100, 50]);  // iMessage-like vibration pattern
  };

  return (
    <TouchableOpacity
      onPressIn={() => setIsPressed(true)}
      onPressOut={handlePressOut}
      activeOpacity={1}  // Maintain the same opacity level when pressed
      onPress={() => navigation.navigate('Search', {})}
      style={[
        styles.container,
        { backgroundColor: isPressed ? '#C60000' : '#ED0000' } // Darker red when pressed
      ]}
    >
      <InsetShadow
        containerStyle={styles.shadow}
        shadowRadius={20}
        shadowOffset={60}
        elevation={15}
        shadowOpacity={1}
        color="rgba(128,128,128,1)"
        right={false}
        top={false}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.text}>Get Me Somewhere</Text>
          <SvgXml
            xml={svgWhiteMagnifyingGlass}
            width="25"
            height="25"
            style={styles.icon}
          />
        </View>
      </InsetShadow>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: screenWidth * 90 / 100,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    overflow: 'hidden',  // Ensure the shadow does not overflow
    position: 'relative',  // Required for absolute positioning of the shadow overlay
  },
  shadow: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontWeight: '600',
    color: 'white',
    fontSize: 18,
    marginLeft: '30%',
    zIndex: 1,  // Ensure text is above the gradient
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    marginRight: 20
  },
});
