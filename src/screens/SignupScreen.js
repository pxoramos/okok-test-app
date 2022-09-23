import React, {useContext, useState} from 'react';
import {AuthContext} from '_context/AuthProvider';
import {
  Stack,
  TextInput,
  Button,
  Text,
  Divider,
} from '@react-native-material/core';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signUp} = useContext(AuthContext);

  return (
    <Stack spacing={10} style={{margin: 16, flex: 1, justifyContent: 'center'}}>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="SIGNUP" onPress={() => signUp({email, password})} />
      <Divider style={{marginTop: 20}} />
      <Stack direction="row" style={{marginTop: 20, alignSelf: 'center'}}>
        <Text variant="body1">Already a user? </Text>
        <Text
          variant="body1"
          style={{textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('Login')}>
          LOGIN
        </Text>
      </Stack>
    </Stack>
  );
};

export default SignupScreen;
