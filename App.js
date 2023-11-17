import React, { Suspense, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import LandingPage from "./screens/LandingScreen";
import Main from "./screens/MainComponent";
import LoginScreen from "./screens/LoginScreen";
import store from "./store";
import { createStackNavigator } from "@react-navigation/stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator();
const auth = getAuth();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false); // Set loading to false when auth state is determined
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator />; // Show loading indicator while waiting for auth state
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Suspense fallback={<ActivityIndicator />}>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? "Main" : "Landing"}
            screenOptions={{ headerShown: false }}
          >
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
