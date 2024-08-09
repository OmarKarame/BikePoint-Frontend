import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { SvgXml } from 'react-native-svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React from 'react'
import { useState, useEffect } from 'react'
import clockIcon from '../assets/images/clock-icon.png'
import svgExpandArrow from '../assets/svgs/svgExpandArrow';

export default function DepartureTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [time, setTime] = useState(new Date());
  const [isPressed, setIsPressed] = useState(false);
  const [isNow, setIsNow] = useState(true);

  const showPicker = () => {
    setPickerVisibility(true);
  };

  const hidePicker = () => {
    setPickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTime(date);
    setIsNow(isTimeNow(date));
    hidePicker();
  };

    const startInterval = () => {
      if (intervalId === null) {
          const id = setInterval(() => {
              setCurrentTime(new Date());
          }, 60000);
          setIntervalId(id);
      }
    };

  const handlePressIn = () => {
    setIsPressed(true);
  }
  const handlePressOut = () => setIsPressed(false);

  const now = new Date();
  const twoDaysLater = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const isTimeNow = (givenTime) => {
    const now = new Date();
    const given = new Date(givenTime);

    const differenceInMilliseconds = Math.abs(now - given);
    const secondsDifference = differenceInMilliseconds / 1000;

    return secondsDifference <= 60;
  };

  useEffect(() => {
    // Check if the time is equal to the current or earlier before executing this code
    if (time <= currentTime){
      const interval = setInterval(() => {
        const now = new Date();
        setIsNow(isTimeNow(now));
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [time])

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={showPicker}
    >
      <View style={styles.content}>
        <Text style={styles.text}>Time</Text>
        <View style={styles.mainImage}>
          <Image source={clockIcon} style={styles.image}/>
        </View>
        <View style={[styles.contentInfo, isNow ? { transform: [{ translateY: -1 }, {translateX: 28}] } : { transform: [{ translateY: -1 }, {translateX: -4}] }]}>
          <DateTimePickerModal
            isVisible={isPickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hidePicker}
            date={time}
            is24Hour={true}
            minimumDate={now}
            maximumDate={twoDaysLater}
          />
          <Text style={styles.time}>
            {isNow ? 'Now' : `${time.toLocaleDateString('en-US',{ weekday: 'short' }).split(' ')[0]} ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`}
          </Text>
          <SvgXml
            xml={svgExpandArrow}
            width="20"
            height="20"
            style={isNow ? [{ transform: [{ translateX: -14 }] }] : [{ translateX: -10 }]}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,
    borderRadius: 20,
    maxWidth: '49.5%',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    height: '100%'
  },
  text: {
    marginLeft: -10,
    marginRight: 5,
    fontWeight: '700',
    width: '25%'
  },
  pressed: {
    backgroundColor: 'rgba(195, 222, 231, 1)',
  },
  image: {
    height: 20,
    width: 20,
    marginBottom: 2
  },
  contentInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
    marginLeft: 16,
    height: '100%',
    marginTop: 2,
    marginRight: 8,

  },
  time: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  }
})
