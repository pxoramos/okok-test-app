import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAuthStore} from '_store/useAuthStore';
import HomeScreen from '_screens/Home';
import LoginScreen from '_screens/LoginScreen';
import SignupScreen from '_screens/SignupScreen';
import SplashScreen from '_screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Navigation = ({children}) => {
  const authState = useAuthStore(state => state);

  if (authState.isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {authState.userToken == null ? (
          <Stack.Group
            screenOptions={{
              animationTypeForReplace: authState.signOut ? 'pop' : 'push',
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Group>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
