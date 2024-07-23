import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import LocationContext from "../components/LocationContext";

import svgHomeGreyIconMarkup from '../assets/svgs/svgHomeGreyIconMarkup';
import svgHomeRedIconMarkup from '../assets/svgs/svgHomeRedIconMarkup';
import svgMapGreyIconMarkup from '../assets/svgs/svgMapGreyIconMarkup';
import svgMapRedIconMarkup from '../assets/svgs/svgMapRedIconMarkup';
import svgSettingsGreyIconMarkup from '../assets/svgs/svgSettingsGreyIconMarkup';
import svgSettingsRedIconMarkup from '../assets/svgs/svgSettingsRedIconMarkup';
import svgRedMyStatisticsIcon from '../assets/svgs/svgRedMyStatisticsIcon';
import svgGreyMyStatisticsIcon from '../assets/svgs/svgGreyMyStatisticsIcon';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function NavBar({ currentPage = 'Home', navigation }) {
  const { cyclingRoute } = useContext(LocationContext);

  const SelectedPage = {
    'Home': -screenWidth / 3.2,
    'Map': -screenWidth / 11.2,
    'Settings': screenWidth / 6.96,
    'Statistics': screenWidth / 2.7,
  };

  const svgHomeIconMarkup = (isActive) => isActive ? svgHomeRedIconMarkup : svgHomeGreyIconMarkup;
  const svgMapIconMarkup = (isActive) => isActive ? svgMapRedIconMarkup : svgMapGreyIconMarkup;
  const svgSettingsIconMarkup = (isActive) => isActive ? svgSettingsRedIconMarkup : svgSettingsGreyIconMarkup;
  const svgStatisticsIconMarkup = (isActive) => isActive ? svgRedMyStatisticsIcon : svgGreyMyStatisticsIcon;

  const translateValue = SelectedPage[currentPage] || 0;

  const getIconMarkup = (iconName) => {
    const isActive = currentPage === iconName;
    switch (iconName) {
      case 'Home':
        return svgHomeIconMarkup(isActive);
      case 'Map':
        return svgMapIconMarkup(isActive);
      case 'Settings':
        return svgSettingsIconMarkup(isActive);
      case 'Statistics':
        return svgStatisticsIconMarkup(isActive);
      default:
        return '';
    }
  };

  const handleMapPress = () => {
    if (cyclingRoute.length === 0) {
      navigation.navigate('Search');
    } else {
      navigation.navigate('Map');
    }
  };

  return (
    <View style={styles.navContainer}>
      <Image
        source={require('../assets/images/footer-bar.png')}
        style={[styles.localImage, { transform: [{ translateX: translateValue }, { translateY: 0 }] }]}
      />
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={currentPage === 'Home' ? styles.iconBackground : styles.transparentBackground}>
            <SvgXml
              xml={getIconMarkup('Home')}
              width="40"
              height="40"
              style={currentPage === 'Home' ? styles.activeIcon : styles.icon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMapPress}>
          <View style={currentPage === 'Map' ? styles.iconBackground : styles.transparentBackground}>
            <SvgXml
              xml={getIconMarkup('Map')}
              width="40"
              height="40"
              style={currentPage === 'Map' ? styles.activeIcon : styles.icon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <View style={currentPage === 'Settings' ? styles.iconBackground : styles.transparentBackground}>
            <SvgXml
              xml={getIconMarkup('Settings')}
              width="40"
              height="40"
              style={currentPage === 'Settings' ? styles.activeIcon : styles.icon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Statistics')}>
          <View style={currentPage === 'Statistics' ? styles.iconBackground : styles.transparentBackground}>
            <SvgXml
              xml={getIconMarkup('Statistics')}
              width="38"
              height="38"
              style={currentPage === 'Statistics' ? styles.activeIcon : styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: screenWidth,
  },
  localImage: {
    width: 770,
    height: screenHeight * 10 / 100,
    position: 'absolute',
  },
  navButtons: {
    width: screenWidth - 20,
    bottom: 0,
    height: 70,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  transparentBackground: {},
  iconBackground: {
    borderRadius: 50,
    backgroundColor: 'white',
    transform: [{ translateY: -50 }],
    padding: 10
  },
  icon: {
    transform: [{ translateY: -10 }]
  },
});
