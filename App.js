/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import * as React from 'react';
 import { Button, View, Text } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { DetailsScreen } from './src/views/screen/DetailScreen';
 import { InputOTPScreen } from './src/views/screen/InputOTPScreen';
 import { SignUpScreen } from './src/views/screen/SignUpScreen';
 import { SignInScreen } from './src/views/screen/SignInScreen';
 const Stack = createNativeStackNavigator();
 
  
 function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUpScreen">
        <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} />
        <Stack.Screen 
        name="InputOTP" 
        component={InputOTPScreen} 
        options={{title: 'Input OTP', headerBackTitle: ''}}
        />
        <Stack.Screen 
        name="Detail" 
        component={DetailsScreen} 
        options={{title: 'Detail', headerBackTitle:  ''}} 
        />
        <Stack.Screen 
        name="SignIn" 
        component={SignInScreen} 
        options={{title: 'SignIn', headerBackTitle:  ''}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

 
 export default App;
 