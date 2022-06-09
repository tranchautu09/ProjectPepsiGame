/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import * as React from 'react';
 import RootNavigator from './src/presentation/navigation/RootNavigator';
 import {store} from './src/presentation/redux/store';
 import {Provider} from 'react-redux';
 import {registerDependencies} from './src/di/AppModule';
 
  
 const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

 
 export default App;
 