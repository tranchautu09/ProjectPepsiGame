import React from 'react';
import {AuthenticationNavigatior} from './AuthenticationStackNavigation';
import {NavigationContainer} from '@react-navigation/native';

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthenticationNavigatior />
    </NavigationContainer>
  );
};

export default RootNavigator;
