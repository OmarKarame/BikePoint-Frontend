import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocationProvider } from './components/LocationContext';
import NavBarWrapper from './components/NavBarWrapper';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import Home from './screens/Home';
import Chat from './screens/Chat';
import Map from './screens/Map';
import Settings from './screens/Settings';
import Search from './screens/Search';


const Stack = createNativeStackNavigator();

// Ignoring specific warnings while in development mode
if (__DEV__) {
    const ignoredWarnings = [
      'Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
      // Reason: Known widespread issue due to recent react native version changes, hopefully would be fixed in next stable release of React
      // default props not directly used in code, but some dependencies still use it even with latest version: expo-cli and babel/helpers,
      'This synthetic event is reused for performance reasons. If you\'re seeing this, you\'re %s `%s` on a released/nullified synthetic event. %s. If you must keep the original synthetic event around, use event.persist()',
        // Reason: Unknown for now, docs are outdated and persist didnt work properly (maybe need to use it differently?)
        
    ];
  
    console.error = (message) => {
      if (ignoredWarnings.some(warning => message.includes(warning))) {
        return;
      }
      // Continue logging other warnings as normal
      console.warn(message);
    };
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  // Listeners and handlers for incoming and interacting with notifications
  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <LocationProvider>
      <NavigationContainer>
          <View style={styles.container}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animationEnabled: false, animation: 'none' }}>
              <Stack.Screen name="Home" component={Home}/>
              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator>
            <NavBarWrapper />
          </View>
      </NavigationContainer>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
