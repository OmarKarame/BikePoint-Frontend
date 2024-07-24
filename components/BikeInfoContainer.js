import React, { useRef, useEffect, useMemo, useContext } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapDisplay from './MapDisplay';
import ExtraInfoCard from '../components/ExtraInfoCard';
import CustomBackground from './CustomBackground';
import LocationContext from '../components/LocationContext';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function BikeInfoContainer({ location, startStation, endStation }) {
  const bottomSheetRef = useRef(null);

  const {
    timeToDestination,
    time,
  } = useContext(LocationContext);

  const snapPoints = useMemo(() => ['21%', '90%'], []);

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
              <View style={styles.timeInfo}>
                <View style={styles.departureTime}>
                  <Text style={styles.timeTextLeft}>Leave:</Text>
                  <Text style={styles.timeTextLeft}>{`${time.toLocaleDateString('en-US',{ weekday: 'short' }).split(' ')[0]}, ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`}</Text>
                </View>
                <View style={styles.arrivalTime}>
                  <Text style={styles.timeTextRight}>{Math.round(timeToDestination / 60)} Min</Text>
                </View>
              </View>
              <View style={styles.bikeInfo}>
                <ExtraInfoCard
                  header={'Start'}
                  title={startStation.commonName}
                  stationBikes={startStation.nbBikes}
                  stationDocks={startStation.nbDocks}
                  info={`${startStation.nbBikes}/${startStation.nbDocks}`}
                />
                <ExtraInfoCard
                  header={'End'}
                  title={endStation.commonName}
                  stationBikes={endStation.nbBikes}
                  stationDocks={endStation.nbDocks}
                  info={`${endStation.nbBikes}/${endStation.nbDocks}`}
                />
              </View>
              {/* <View style={styles.timeInfo}>
                <ExtraInfoCard
                  isRed={true}
                  displayImage={svgWhiteClock}
                  title={'Departure Time'}
                  info={'17:00'}
                />
                <ExtraInfoCard
                  isRed={false}
                  displayImage={svgRedTimer}
                  title={'Arrival Time'}
                  info={'0 Min'}
                />
              </View> */}
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
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 80,
  },
  handle: {
    width: 80,
    backgroundColor: '#777',
  },
  bikeInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    transform: [{translateY: -20}]
  },
  timeInfo: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -60,
    marginBottom: 60,
  },
  timeTextLeft: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    transform: [{translateY: -5}]
  },
  timeTextRight: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    transform: [{translateY: -5}]
  }
});
