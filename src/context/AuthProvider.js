import React, {createContext, useCallback, useEffect, useMemo} from 'react';
import auth from '@react-native-firebase/auth';

import {useAuthStore} from '_store/useAuthStore';

const AuthContext = createContext();

/**
 * @param {{
 * email: String,
 * password: String
 * }} data
 * @returns {React.Component}
 */

const AuthProvider = ({children}) => {
  const authState = useAuthStore(state => state);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authState.onAuthStateChanged); //firebase auth state listener
    return subscriber; //unsubscribe on unmount
  }, []);

  const signIn = useCallback(
    async data => {
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
    [authState.userToken],
  );

  const signUp = useCallback(
    async data => {
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
    [authState.userToken],
  );

  const signOut = useCallback(async () => {
    //sign out user from firebase
    authState.signOut();
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }, [authState.userToken]);

  const authContext = useMemo(
    () => ({
      signIn,
      signUp,
      signOut,
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
