import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Pressable, Animated } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from 'react-native-google-signin';

function App() {
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

  function googleSignOut() {
    fadeOut();

    auth().signOut()
    .then(function() {
      console.log('User signout successful')
    }, function(error) {
      console.log('Signout failed')
    });
  }

  //listener for the authentication state
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  if (!user) {
    return (
      <View>  
        <Text>Placeholder</Text>

        <Button title = "Sign In With Google"
                onPress = {signInWithGoogleAsync}
          />

      </View>
    );
  }

  return (
    <View style = {styles.container}>
      <Text> Hi {user.displayName}!</Text>

      <Pressable style = {styles.pressableButton}
                 onPressIn = {fadeIn}
                 onPressOut = {googleSignOut}>  
        <Animated.View style = {{opacity:animated}}>
          <Text style = {styles.buttonText}> Log Out </Text> 
        </Animated.View> 
        
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  pressableButton: {
    borderRadius: 5,
    padding: 5,
    marginTop: 10, 
    backgroundColor: "white",
  },

  buttonText: {
    fontSize: 20,
    fontFamily: 'Montserrat Medium',
    color: "black",
  }
});

export default App;
