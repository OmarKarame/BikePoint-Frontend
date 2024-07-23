import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { SvgXml } from 'react-native-svg'

export default function CustomNotificationsButton({ icon, text }) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
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
          width="37"
          height="37"
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
    marginTop: 4,
  },
  setLocation: {
    width: '100%',
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: -3,
  },
  icon: {
    marginTop: 4,
  }
})
