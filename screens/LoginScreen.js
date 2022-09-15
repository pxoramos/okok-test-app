import React from 'react';
import {View, TextInput} from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        placeholder="Username"
        value={username}
        onChange={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChange={setPassword}
        secureTextEntry
      />
    </View>
  );
};

export default LoginScreen;
