import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DepartureTime from './DepartureTime'
import TakeMe from './TakeMe'
import ArrivalTime from './ArrivalTime'
import NumberOfBikes from './NumberOfBikes'
import houseIcon from '../assets/images/house-icon.png'
import briefcase from '../assets/images/briefcase-icon.png'

export default function AdditionalContentButtons() {
  return (
    <View style={styles.container}>
      {/* <DepartureTime /> */}
      <TakeMe
        icon={houseIcon}
        location={'Home'}
      />
      <TakeMe
        icon={briefcase}
        location={'To Work'}
        isWork={true}
      />
      {/* <ArrivalTime isLocationSet={false}/> */}
      {/* <NumberOfBikes /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '35%',
    marginBottom: 10
  }
})
