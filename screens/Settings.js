// import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Settings() {
  const [hasPermission, setHasPermission] = useState(false);
  const navigation = useNavigation();

  // Variables for the user metrics
  const [calories, setCalories] = useState(1230);
  const [co2Saved, setCo2Saved] = useState(10.0);
  const [moneySaved, setMoneySaved] = useState(500);

  //TODO: Notification checkpoint: Notifications permission working, need to check and fix
  // warning: Property 'Alert' doesn't exist
  const enableNotifications = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
      setHasPermission(true);
      Alert.alert('Notifications enabled!');
    } else {
      Alert.alert('Push notification only works in actual device, do not use VM');
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    try {
      const projectId = Constants.expoConfig?.extra?.eas?.projectId || Constants.manifest.extra.eas.projectId; // TODO: Check manifest
      const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log(token);
    } catch (e) {
      console.error(e);
    }
  };


  // Methods for buttons in settings
  const handleNotificationsPress = () => {
    enableNotifications();
  };

  const handleFaqPress = () => {
    alert("FAQs clicked!");
    //TODO
  };

  const handleToSPress = () => {
    alert("Terms of Service clicked!");
    //TODO
  };

  const handleContactPress = () => {
    alert("Contact Us clicked!");
    //TODO
  };

  const handleRateAppPress = () => {
    alert("Rate the app clicked!");
    //TODO
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0)", "#F5F5F5", "#E1E1E1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.0, 0.75, 1.0]}
        style={styles.innerShadow}
      />
      <View style={styles.header}>
        <Text style={styles.headingText}>Settings</Text>
      </View>

      {/* Buttons */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNotificationsPress}
          activeOpacity={0.5}
        >
          <View style={styles.buttonTextContainer}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Notifications</Text>
              <Text style={styles.subheaderText}>
                Select the kind of notifications you get about your activities
                and reminders.
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={22}
              color="black"
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleFaqPress}
          activeOpacity={0.5}
        >
          <View style={styles.buttonTextContainer}>
            <Ionicons name="help-circle-outline" size={24} color="black" />
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>FAQs</Text>
              <Text style={styles.subheaderText}>
                Your go-to source for troubleshooting and tips on using the app
                and its features.
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={22}
              color="black"
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleToSPress}
          activeOpacity={0.5}
        >
          <View style={styles.buttonTextContainer}>
            <Ionicons name="document-text-outline" size={24} color="black" />
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Terms of Service</Text>
              <Text style={styles.subheaderText}>
                Understand the guidelines and policies for using our app and
                services.
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={22}
              color="black"
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleContactPress}
          activeOpacity={0.5}
        >
          <View style={styles.buttonTextContainer}>
            <Ionicons name="mail-outline" size={24} color="black" />
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Contact Us</Text>
              <Text style={styles.subheaderText}>
                We're here to assist you with any issues or questions you may
                have.
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={22}
              color="black"
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleRateAppPress}
          activeOpacity={0.5}
        >
          <View style={styles.buttonTextContainer}>
            <Ionicons name="star-outline" size={24} color="black" />
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Rate the app</Text>
              <Text style={styles.subheaderText}>
                Love our app? Let us know by rating us!
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={22}
              color="black"
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>

        {/* User Metrics */}
        <View style={styles.bottomSection}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 2,
    height: Platform.OS === 'ios'? 150: 0.15*screenHeight,
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
  headerText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  subheaderText: {
    color: "#616161",
    fontSize: 14,
    marginTop: 2,
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "transparent",
    width: "100%",
    paddingVertical: 7,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingRight: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 7,
  },
  arrowIcon: {
    position: "absolute",
    right: -15, // negative otherwise it goes within the buttons, theres border for ionicons
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 20,
    marginBottom: 100,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconBackground: {
    backgroundColor: "red",
    borderRadius: 100,
    padding: 10,
  },
  iconText: {
    marginTop: 5,
    color: "black",
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
});
