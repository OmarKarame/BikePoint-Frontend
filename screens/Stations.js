import { StyleSheet, Text, View, Dimensions, SectionList, TouchableOpacity, Image, Button, Platform } from 'react-native';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import StationCard from '../components/StationCard';
import svgWhiteBackButton from '../assets/svgs/svgWhiteBackButton';
import { SvgXml } from 'react-native-svg';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default function Stations() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "#F5F5F5", "#E1E1E1"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0.0, 0.75, 1.0]}
          style={styles.innerShadow}
        />
        <SvgXml
          xml={svgWhiteBackButton}
          width="25"
          height="25"
          style={styles.icon}
          onPress={() => navigation.navigate('Home', {})}
        />
      </View>
      <View style={styles.body}>
        <StationCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    zIndex: 2,
    height: Platform.OS === 'ios' ? 150 : 0.15 * screenHeight,
    width: screenWidth,
    backgroundColor: "#ED0000",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "#EC0000",
    shadowOpacity: 0.6,
    shadowRadius: 5,
    paddingBottom: 27,
  },
  body: {
    height: screenHeight * 81 / 100,
    width: screenWidth * 90 / 100,
    zIndex: 21,
    paddingBottom: 100,
    borderBlockColor: 'black',
    borderWidth: 1,
  },
  icon: {
    position: 'absolute',
    top: screenHeight * 7 / 100,
    left: screenWidth * 5 / 100,
  },
})
