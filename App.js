import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, View, Text, Pressable, Animated } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from 'react-native-google-signin';
import normalize from "./src/assets/components/fontScale"; 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import Dashboard from "./src/screens/Dashboard";
import Compendium from "./src/screens/Compendium";
import Encounters from "./src/screens/Encounters";

function App() {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  // Set an initializing state while Firebase connects
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
    "699242922891-nhiu6uceoha2qeojej4jjcf1n5fsm9r2.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  });

  //Pressable opacity animation handlers
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

  //Sign in with google handler
  const signInWithGoogleAsync = async () => {

    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    const user_sign_in =  auth().signInWithCredential(googleCredential);

    user_sign_in.then((user)=>{
      console.log(user);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    //console.log('got here 3')
    setUser(user);
  }

  // listener for the authentication state
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  // Sign in Page
  if (!user) {
    return (
      <ImageBackground style = {styles.splash} resizeMode = "cover" source = {require('./src/assets/images/splash.png')}>
      <View style = {styles.container}>  
        <View style = {styles.logoContainer}>
          <Image style = {styles.logo} source = {require('./src/assets/images/logo.png')}/>
        </View>

        <View style = {styles.signInButtonContainer}>
          <View style = {styles.GlogoContainer}>
            <Image style = {styles.Glogo} source = {require('./src/assets/images/google.png')}/>
          </View>
          <Pressable style = {styles.googleButton}
                     onPressIn = {fadeIn}
                     onPressOut = {signInWithGoogleAsync}>  
                  
            <Animated.View style = {{opacity:animated}}>
              <Text style = {styles.buttonText}> Sign in with Google</Text> 
            </Animated.View> 
          
          </Pressable>
        </View>

        
      </View>
      </ImageBackground>
    );
  }

  //HOME SCREEN IF LOGGED IN
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName = "Dashboard"
                     tabBarOptions = {{ labelStyle: {
                                          fontSize: normalize(10),
                                          marginBottom: normalize(5),
                                          fontFamily: "Book Antiqua",
                                          color: "white",
                                        },
                                        style: {
                                          height: normalize(45),
                                        },
                                        activeBackgroundColor: "#202225",
                                        inactiveBackgroundColor: "#2f3136"

                                     }}
                     >
        <Tab.Screen name = "Dashboard" 
                    component = {Dashboard}
                    options = {{
                      tabBarIcon: () => {
                        return (
                          <Image style = {styles.tabIcon }
                          source = {require('./src/assets/images/home.png')}/>
                        );
                      },
                    }} />
        <Tab.Screen name = "Compendium" 
                    component = {Compendium}
                    options = {{
                    tabBarIcon: () => {
                      return (
                        <Image style = {styles.tabIcon }
                        source = {require('./src/assets/images/tome.png')}/>
                      );
                    },
                  }} />
        <Tab.Screen name = "Encounters" 
                    component = {Encounters}
                    options = {{
                      tabBarIcon: () => {
                        return (
                          <Image style = {styles.tabIcon }
                          source = {require('./src/assets/images/battle.png')}/>
                        );
                      },
                    }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabIcon: {
    width: normalize(19),
    height: normalize(19),
    marginTop: normalize(8),
  },

  logo: {
    width: normalize(300),
    height: normalize(75),
    marginTop: "11%",
  },

  logoContainer: {
    flex: 6.5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  signInButtonContainer: {
    flex: 4.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: normalize(70),
  },

  signOutButtonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: normalize(50)
  },

  Glogo: {
    width: normalize(25),
    height: normalize(25),
  },

  GlogoContainer: {
    elevation: 5,
    padding: normalize(6),
    backgroundColor: "white",
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

export default App;
