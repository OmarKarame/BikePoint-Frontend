import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapDisplay from './MapDisplay';
import ExtraInfoCard from '../components/ExtraInfoCard';
import svgWhiteClock from '../assets/svgs/svgWhiteClock';
import svgRedTimer from '../assets/svgs/svgRedTimer';
import svgRedDockedBicycle from '../assets/svgs/svgRedDockedBicycle';
import svgWhiteBicycle from '../assets/svgs/svgWhiteBicycle';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default function BikeInfoContainer({ location, startStation, endStation }) {
  const modalizeRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const preventClosing = () => true;

  const handleStyle = isModalOpen
    ? styles.handleOpen
    : styles.handleClosed;

  useEffect(() => {
    modalizeRef.current?.open();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, marginTop: 80, width: screenWidth, }}>
      <View style={styles.container}>
        <MapDisplay
          location={location}
        />
        <Modalize
        ref={modalizeRef}
          snapPoint={screenHeight * 20/100}
          modalHeight={screenHeight * 70/100}
          alwaysOpen={100}
          onOverlayPress={preventClosing}
          onBackButtonPress={preventClosing}
          adjustToContentHeight={false}
          avoidKeyboardLikeIOS={true}
          modalStyle={{
            backgroundColor: 'transparent',
            shadowColor: 'transparent'
          }}
          handleStyle={styles.handle}
        >
          <View style={styles.infoContainer}>
            {/* <Text style={[{color: 'white', paddingTop: 7}]}>Swipe up for more</Text> */}
            <View style={styles.infoSection}>
              <View style={styles.bikeInfo}>
                <ExtraInfoCard
                  isRed={true}
                  displayImage={svgWhiteBicycle}
                  title={startStation.commonName}
                  info={`${startStation.nbBikes}/${startStation.nbDocks}`}
                />
                <ExtraInfoCard
                  isRed={false}
                  displayImage={svgRedDockedBicycle}
                  title={endStation.commonName}
                  info={`${endStation.nbBikes}/${endStation.nbDocks}`}
                />
              </View>
              <View style={styles.timeInfo}>
                <ExtraInfoCard
                  isRed={true}
                  displayImage={svgWhiteClock}
                  title={'Departure Time'}
                  info={'17:00'}
                />
                <ExtraInfoCard
                  isRed={false}
                  displayImage={svgRedTimer}
                  title={'EST. Time Till Arrival'}
                  info={'0 Min'}
                />
              </View>
            </View>
          </View>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 82/100,
    backgroundColor: 'transparent',
    borderRadius: 30,
  },
  infoContainer:{
    height: screenHeight * 65/100,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    alignItems: 'center',
  },
  infoSection: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 80
  },
  handle: {
    width: 80,
    backgroundColor: '#777',
  },
  bikeInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timeInfo:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20
  }
})
