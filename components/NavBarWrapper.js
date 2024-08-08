import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import NavBar from './NavBar';
export default function NavBarWrapper() {
  const navigation = useNavigation();
  const screenName = useNavigationState((state) => state?.routes[state?.index]?.name ?? 'Home');
  const [displayNavBar, setDisplayNavBar] = useState(false)

  useEffect(() => {
    if (screenName == 'Search' || screenName == 'Stations') {
      setDisplayNavBar(false)
    } else {
      setDisplayNavBar(true)
    }
  }, [screenName])

  return (
    <View style={navStyles.navContainer}>
      {displayNavBar ? <NavBar currentPage={screenName} navigation={navigation} /> : <></>}
    </View>
  );
}

const navStyles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});
