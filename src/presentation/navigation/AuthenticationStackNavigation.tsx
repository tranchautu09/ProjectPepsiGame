import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import SignIn from '../screens/authentication/SignIn';
// import SignUp from '../screens/authentication/SignUp';

const Stack = createNativeStackNavigator();

export const AuthenticationNavigatior: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Sign in" component={SignIn} />
      <Stack.Screen name="Sign up" component={SignUp} />
    </Stack.Navigator>
  );
};
