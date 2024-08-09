import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import React from 'react'

export default function ButtonComponent({ text, icon, buttonColor, handlePress }) {
  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, {backgroundColor: buttonColor}]}>
      {text && !icon && <Text style={[styles.text]}>{text}</Text>}
      {icon && !text && (
        <SvgXml
          xml={icon}
          width="20"
          height="20"
          style={styles.icon}
        />
      )}
      <LinearGradient
        colors={['EC0000', 'black']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.0, 0.5]}
        style={styles.innerShadow}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    width: '12%',
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  text:{
    color: 'white',
    fontWeight: '600',
  },
  icon: {
    transform: [{ rotate: '90deg' }]
  }
})
