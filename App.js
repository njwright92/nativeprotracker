import React from 'react';
import 'react-native-get-random-values';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './components/SplashScreen';
import Main from './screens/MainComponent';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <NavigationContainer>
         <Main />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default App;
