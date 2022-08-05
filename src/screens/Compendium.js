import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';
import normalize from "../assets/components/fontScale"; 
import auth from '@react-native-firebase/auth';

export function Compendium() {

  return (
    <View style = {styles.container}>
      <Text style = {styles.generalText}> Compendium </Text>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  generalText: {
    color: "black",
    fontSize: normalize(30),
  }
});


export default Compendium;