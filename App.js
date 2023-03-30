import React from 'react';
import 'react-native-get-random-values';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './components/SplashScreen';
import Main from './screens/MainComponent';
import LoginScreen from './screens/LoginScreen';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { createStackNavigator } from '@react-navigation/stack';

const stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <NavigationContainer>
          <stack.Navigator initialRouteName="Login">
            <stack.Screen name="Login" component={LoginScreen} />
            <stack.Screen name="Main" component={Main} />
          </stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default App;
