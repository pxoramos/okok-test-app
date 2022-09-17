/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {authStore} from './store/authStore';
import {AuthContext} from './utils/contexts';

import HomeScreen from './screens/Home';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const authState = authStore(state => state);

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authState.onAuthStateChanged); //firebase auth state listener
    return subscriber; //unsubscribe on unmount
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        //sign in an existing user using email and passowrd to firebase
        auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then(() => {
            console.log('User account signed in');
          })
          .catch(error => {
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
      },
      signUp: async data => {
        //register a new user using email and password to firebase
        auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(() => {
            console.log('User account created & signed in');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
      },
      signOut: async () => {
        //sign out user from firebase
        authState.signOut();
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
      },
    }),
    [],
  );

  if (authState.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {authState.userToken == null ? (
            <Stack.Group
              screenOptions={{
                animationTypeForReplace: authState.signOut ? 'pop' : 'push',
              }}>
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Group>
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
