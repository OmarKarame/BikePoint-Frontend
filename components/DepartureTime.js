import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg';
import React from 'react'
import svgDarkGreyClock from '../assets/svgs/svgDarkGreyClock';
import svgExpandArrow from '../assets/svgs/svgExpandArrow';

export default function DepartureTime() {
  const currentTime = new Date();

  const hours = currentTime.getHours().toString();
  const minutes = currentTime.getMinutes().toString();

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.content}>
          <SvgXml
            xml={svgDarkGreyClock}
            width="32"
            height="32"
          />
          <Text style={styles.time}>
            {hours.padStart(2, '0')}:{minutes.padStart(2, '0')}
          </Text>
          <SvgXml
            xml={svgExpandArrow}
            width="15"
            height="15"
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: '1',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%'
  },
  time: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500'
  }
})
