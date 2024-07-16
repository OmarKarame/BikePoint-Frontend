import React, { useRef, useEffect, useMemo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapDisplay from './MapDisplay';
import ExtraInfoCard from '../components/ExtraInfoCard';
import svgWhiteClock from '../assets/svgs/svgWhiteClock';
import svgRedTimer from '../assets/svgs/svgRedTimer';
import svgRedDockedBicycle from '../assets/svgs/svgRedDockedBicycle';
import svgWhiteBicycle from '../assets/svgs/svgWhiteBicycle';
import CustomBackground from './CustomBackground';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function BikeInfoContainer({ location, startStation, endStation }) {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['20%', '90%'], []);

  useEffect(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleSheetChanges = (index) => {
    if (index === -1) {
      // If the sheet is closed, expand it back to the minimum snap point
      bottomSheetRef.current?.snapTo(0);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapDisplay location={location} />
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          handleIndicatorStyle={styles.handle}
          backgroundComponent={(props) => <CustomBackground {...props} />}
          onChange={handleSheetChanges}
        >
          <View style={styles.infoContainer}>
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
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    height: screenHeight * 68 / 100,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    alignItems: 'center',
  },
  infoSection: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 80,
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
  timeInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
});
