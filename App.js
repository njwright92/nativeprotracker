import React, { useState, useEffect } from 'react';
import 'react-native-get-random-values';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './components/SplashScreen';
import Main from './screens/MainComponent';
import LoginScreen from './screens/LoginScreen';
import store from './store';
import { createStackNavigator } from '@react-navigation/stack';

const stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator initialRouteName="Login">
          <stack.Screen name="Login" component={LoginScreen} />
          <stack.Screen name="Main" component={Main} />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
