import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native';

export default function StationsButton({ icon, text }) {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();

  const handlePressIn = () => {
    setIsPressed(true);
    navigation.navigate('Stations');
  }
  const handlePressOut = () => setIsPressed(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container, isPressed ? styles.pressed : {}]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.content}>
        <SvgXml
          xml={icon}
          width="40"
          height="40"
          style={styles.icon}
        />
        <Text style={styles.setLocation}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    minWidth:'12%',
    alignItems: 'center',
    maxWidth: '24%',
    // backgroundColor: 'rgba(195, 222, 231, 0.5)',
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.5
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    height: '100%'
  },
  image: {
    height: 60,
    width: 60,
  },
  setLocation: {
    width: '70%',
    fontSize: 12,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: -8,
    letterSpacing: -0.1
  },
  icon: {
    marginTop: -2,
  }
})
