// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Chat() {
  const navigation = useNavigation();

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
