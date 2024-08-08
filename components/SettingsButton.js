import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsButton = ({ iconName, title, description, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <View style={styles.buttonTextContainer}>
        <Ionicons name={iconName} size={24} color="black" />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>{title}</Text>
          <Text style={styles.subheaderText}>{description}</Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={22}
          color="black"
          style={styles.arrowIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default SettingsButton;
