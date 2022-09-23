/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import {AuthProvider} from '_context/AuthProvider';
import Navigation from '_navigations'

const App: () => Node = () => {

  return (
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  );
};

export default App;
