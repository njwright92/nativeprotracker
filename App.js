import React, { Suspense, useState, useEffect, lazy } from "react"; // Make sure to import `lazy` here
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "./store";
import { createStackNavigator } from "@react-navigation/stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator();
const auth = getAuth();

// Lazy load each screen
const LandingPage = lazy(() => import("./screens/LandingScreen"));
const Main = lazy(() => import("./screens/MainComponent"));
const LoginScreen = lazy(() => import("./screens/LoginScreen"));

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
    // Show loading indicator while waiting for auth state
    // Wrap ActivityIndicator with a View to take full screen
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
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
            {/* Add other screens here */}
          </Stack.Navigator>
        </Suspense>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
