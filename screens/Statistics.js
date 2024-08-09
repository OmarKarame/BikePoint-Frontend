// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Chat() {
  const navigation = useNavigation();

  const [calories, setCalories] = useState(1230);
  const [co2Saved, setCo2Saved] = useState(10.0);
  const [moneySaved, setMoneySaved] = useState(500);

  return (
    <View style={styles.container}>
      <View style={styles.base} />
      <LinearGradient
        colors={['white', '#F5F5F5', '#E1E1E1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.0, 0.75, 1.0]}
        style={styles.innerShadow}
      />
      <View style={styles.header}>
        <Text style={styles.headingText}>My Profile</Text>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.bottomSectionTitle}>
          <Text style={styles.bottomSectionTitleText}>Coming Soon</Text>
        </View>
        <View style={styles.bottomSectionContent}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Ionicons name="fitness-outline" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>
              {calories}
              {"\n"}Calories
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Ionicons name="cloud-outline" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>
              {co2Saved} kg{"\n"}CO2 Saved
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <Ionicons name="cash-outline" size={30} color="white" />
            </View>
            <Text style={styles.iconText}>
              £{moneySaved}
              {"\n"}Saved
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#640000',
    height: 840,
    width: 'auto',
    padding: 0,
  },
  innerShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
  header: {
    zIndex: 2,
    height: Platform.OS === 'ios' ? 150 : 0.15 * screenHeight,
    width: screenWidth,
    backgroundColor: "#ED0000",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "#EC0000",
    shadowOpacity: 0.6,
    shadowRadius: 5,
    paddingBottom: 27,
  },
  headingText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  bottomSection: {
    flexDirection: "column",
    // justifyContent: "space-around",
    // alignItems: 'space-around',
    width: "90%",
    height: 190,
    padding: 20,
    marginBottom: 100,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    marginTop: 20,
  },
  bottomSectionTitle: {
    marginBottom: 30
  },
  bottomSectionTitleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold",
    fontWeight: "bold",
    textAlign: "center",
    opacity: 0.6,
  },
  bottomSectionContent: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: "center",
    opacity: 0.6,
  },
  iconBackground: {
    backgroundColor: "red",
    borderRadius: 100,
    padding: 10,
  },
  iconText: {
    marginTop: 5,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  innerShadow: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: screenWidth * 0.8,
    maxWidth: screenWidth * 0.8
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ED0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: "100%"
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  modalIcon: {
    marginLeft: 10
  },
  closeButton: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    borderBlockColor: 'black',
    borderWidth: 2
  },
  closeButtonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center"
  },
});
