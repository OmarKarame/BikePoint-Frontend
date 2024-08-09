import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DepartureTime from './DepartureTime'
import TakeMe from './TakeMe'
import ArrivalTime from './ArrivalTime'
import NumberOfBikes from './NumberOfBikes'
import houseIcon from '../assets/images/house-icon.png'
import briefcase from '../assets/images/briefcase-icon.png'
import svgBlackStationStatisticsIcon from '../assets/svgs/svgBlackStationStatisticsIcon'
import svgRedTakeMeHomeIcon from '../assets/svgs/svgRedTakeMeHomeIcon'
import svgRedTakeMeToWorkIcon from '../assets/svgs/svgRedTakeMeToWorkIcon'
import svgBlackCustomNotificationsIcon from '../assets/svgs/svgBlackCustomNotificationsIcon'
import StationsButton from './StationsButton'
import CustomNotificationsButton from './CustomNotificationsButton'

export default function AdditionalContentButtons() {
  return (
    <View style={styles.container}>
      <StationsButton
        icon={svgBlackStationStatisticsIcon}
        text={'Stations'}
      />
      <TakeMe
        icon={svgRedTakeMeHomeIcon}
        location={'Home'}
      />
      <TakeMe
        icon={svgRedTakeMeToWorkIcon}
        location={'Work'}
        isWork={true}
      />
      <CustomNotificationsButton
        icon={svgBlackCustomNotificationsIcon}
        text={'Notifications'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '25%',
    marginBottom: 10
  }
})
