import React from 'react';
import Detail from '../screens/authentication/Detail';
import SignIn from '../screens/authentication/SignIn';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../screens/authentication/SignUp';
import VerifyOtp from '../screens/authentication/InputOTP';
import MainScreen from '../screens/authorized/main';
import Game from '../screens/authorized/game';
import Congratulation from '../screens/authorized/congratulation';
import ScanCode from '../screens/authorized/ScanCode';
import Collection from '../screens/authorized/collection';
import GiftsDetails from '../screens/authorized/giftsdetails';
import Instruction from '../screens/authorized/instruction';

const Stack = createStackNavigator();

export const AuthenticationNavigatior: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Sign in" component={SignIn} />
      <Stack.Screen name="Sign up" component={SignUp} />
      <Stack.Screen name="Term of Service" component={Detail} />
      <Stack.Screen name="VerifyOTP" component={VerifyOtp} />
      <Stack.Screen name="Main screen" component={MainScreen} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="Congratulation" component={Congratulation} />
      <Stack.Screen name="Scan code" component={ScanCode} />
      <Stack.Screen name="Collection" component={Collection} />
      <Stack.Screen name="Gifts details" component={GiftsDetails} />
      <Stack.Screen name="Instruction" component={Instruction} />
    </Stack.Navigator>
  );
};
