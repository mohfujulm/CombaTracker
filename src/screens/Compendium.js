import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Animated, Button } from 'react-native';
import normalize from "../assets/components/fontScale"; 
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export function Compendium() {

  return (
    <View style = {styles.container}>
      
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3f434c",
  },

  generalText: {
    color: "black",
    fontSize: normalize(100),
  }
});


export default Compendium;