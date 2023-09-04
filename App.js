import { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from './screens/LandingScreen';

import Main from './screens/MainComponent';
import LoginScreen from './screens/LoginScreen';
import store from './store';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {



  return (
    <Provider store={store}>
      <NavigationContainer>
        <Suspense fallback={<ActivityIndicator />}>
          <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component={LandingPage} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        </Suspense>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
