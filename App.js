import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocationProvider } from './components/LocationContext';
import Home from './screens/Home';
import Chat from './screens/Chat';
import Map from './screens/Map';
import Settings from './screens/Settings';
import Search from './screens/Search';
import NavBarWrapper from './components/NavBarWrapper';

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

export default function App() {

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
