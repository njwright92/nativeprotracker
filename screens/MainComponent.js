import React from 'react';
import { Pressable, View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ItemDetailScreen from './ItemDetailScreen';
import AddItemScreen from './AddItemScreen';
import LineChartScreen from './LineChartScreen';
import { Ionicons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";


const screenOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: '#D79578' },
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 28,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
                onPress={() => {
                    const auth = getAuth();
                    signOut(auth)
                        .then(() => {

                            navigation.navigate('Login');
                        });
                }}
                style={{
                    marginRight: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    borderRadius: 10
                }}
            >
                <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold', marginRight: 5 }}>
                    <Ionicons
                        name="exit-outline"
                        size={20}
                        color="red"
                    /> Logout
                </Text>
            </Pressable>
        </View>
    ),
    headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Pressable
                onPress={() => {
                    navigation.navigate('Home');
                }}
                style={{
                    marginRight: 10,
                }}
            >
                <Image
                    source={require('../assets/img/pro.jpg')}
                    style={{
                        width: 52,
                        height: 20,
                        borderRadius: 10,
                        marginLeft: 25,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 1,
                        shadowRadius: 2,
                    }}
                />
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    borderRadius: 10
                }}>
                    <Ionicons
                        name="home-outline"
                        size={20}
                        color="black"
                    /> Home
                </Text>

            </Pressable>

        </View>
    ),
});


const LoginNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={({ route }) => ({
                    title: route.name
                })}
            />
        </Stack.Navigator>
    );
};

export { LoginNavigator };

const AddItemNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Add Product'
                component={AddItemScreen}
                options={{ title: "ProTracker" }}
            />
            <Stack.Screen name='Product Detail'
                component={ItemDetailScreen}
                options={({ route, }) => ({
                    headerTitle: getFocusedRouteNameFromRoute(route) || 'Product Entries'
                })}
            />
            <Stack.Screen name="LineChart"
                component={LineChartScreen}
                options={({ route }) => ({
                    headerTitle: getFocusedRouteNameFromRoute(route) || 'Line Chart Screen'
                })}
            />
        </Stack.Navigator>
    );
};


const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ title: "ProTracker" }}
            />
            <Stack.Screen
                name='AddItemStack'
                component={AddItemNavigator}
                options={({ route }) => ({
                    headerTitle: getFocusedRouteNameFromRoute(route) || 'Products'
                })}
            />
        </Stack.Navigator>
    );
}


const Main = () => {
    const Stack = createStackNavigator();
    const auth = getAuth();
  
    const isLoggedIn = !!auth.currentUser;
  
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name='Home' component={HomeNavigator} />
            <Stack.Screen name='AddItem' component={AddItemNavigator} />
          </>
        ) : (
          <Stack.Screen name='Login' component={LoginScreen} />
        )}
      </Stack.Navigator>
    );
  };
  
  export default Main;