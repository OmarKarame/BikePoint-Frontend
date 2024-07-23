import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SvgXml } from 'react-native-svg';
import LocationContext from '../components/LocationContext';
import bicycleIcon from '../assets/images/bicycle-icon.png';
import svgExpandArrow from '../assets/svgs/svgExpandArrow';

export default function NumberOfBikes() {
  const {
    setNumBikes,
    numBikes
  } = useContext(LocationContext);
  // const [numberOfBikes, setNumberOfBikes] = useState(1);
  const [isPickerVisible, setPickerVisibility] = useState(false);

  const togglePicker = () => {
    setPickerVisibility(!isPickerVisible);
  };

  const handleCancel = () => {
    setPickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={togglePicker}
      >
        <View style={styles.content}>
          <Text style={styles.leftText}>Bikes</Text>
          <Image source={bicycleIcon} style={styles.image} />
          <View style={styles.infoSection}>
            <Text style={styles.text}>{numBikes}</Text>
            <SvgXml
            xml={svgExpandArrow}å
            width="20"
            height="20"
            style={[{ transform: [{ translateX: -10 }] }]}
          />
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={togglePicker}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.buttonView}>
              <Button title="Done" onPress={handleCancel} color="blue" style={styles.cancelButton}/>
            </View>
            <Picker
              selectedValue={numBikes}
              onValueChange={(itemValue, itemIndex) => setNumBikes(itemValue)}
              style={styles.picker}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                <Picker.Item key={value} label={`${value}`} value={value} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,
    borderRadius: 30,
    maxWidth: '49.5%',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 30,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%'
  },
  pressed: {
    backgroundColor: 'rgba(195, 222, 231, 1)',
  },
  image: {
    height: 25,
    width: 25,
    transform: [{ translateX: -10}]
  },
  contentInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -15,
    width: '30%',
    transform: [{ translateX: 5 }]
  },
  time: {
    fontSize: 13,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
    transform: [{ translateY: -10 }]
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 22,
  // },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center'
  },
  picker: {
    width: 100,
    height: 150,
    transform: [{ translateY: -100 }]
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
    paddingRight: 10,
  },
  cancelButton:{
    fontSize: 12
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 14
  },
  leftText: {
    marginLeft: 8,
    fontWeight: '700',
    width: '25%'
  },
  infoSection: {
    width: '40%',
    height: '100%',
    // backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -6 }]
  }
})
