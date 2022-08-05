import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';
import normalize from "../assets/components/fontScale"; 
import auth from '@react-native-firebase/auth';

export function Dashboard() {

  const animated = new Animated.Value(1);

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  
  // Handler for signout
  function googleSignOut() {
    fadeOut();

    auth().signOut()
    .then(function() {
      console.log('User signout successful')
    }, function(error) {
      console.log('Signout failed')
    });
  }

  return (
    <View style = {styles.container}>
      <Text> Hi {auth().currentUser.email}!</Text>

      
      <View style = {styles.signOutButtonContainer}>
        <Pressable style = {styles.googleButton}
                  onPressIn = {fadeIn}
                  onPressOut = {googleSignOut}>  
          <Animated.View style = {{opacity:animated}}>
            <Text style = {styles.buttonText}> Log Out </Text> 
          </Animated.View> 
        </Pressable>
      </View>

    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3f434c"
  },

  signOutButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: normalize(50)
  },

  googleButton: {
    backgroundColor: "white",
    marginLeft: normalize(5),
    elevation: 20,
    padding: normalize(5),
  },

  pressableButton: {
    borderRadius: 5,
    backgroundColor: "white",
  },

  buttonText: {
    fontSize: normalize(18),
    fontFamily: 'Book Antiqua',
    color: "#424340",
  }
});


export default Dashboard;