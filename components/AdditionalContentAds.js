import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AdditionalContentAds() {
  return (
    <View style={styles.container}>
      <Text>Additional Content Ads</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    color: 'white',
    // backgroundColor: '#3763f8',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 6,
    borderWidth: 0.3,
    borderBlockColor: 'black',
    width: '100%'
  }
})
