import React from 'react';
import { Pressable, View, Text } from 'react-native';
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
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: 'darkslategray' },
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
                onPress={() => {
                    const auth = getAuth();
                    signOut(auth)
                        .then(() => {

                            navigation.navigate('Login');
                        })
                        .catch((error) => {
                            console.log('Error signing out: ', error);
                        });
                }}
                style={{ marginLeft: 2, marginRight: 5 }}
            >
                <Text style={{ color: 'red', fontSize: 14, fontWeight: 'bold' }}>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
                onPress={() => {
                    navigation.navigate('Home');
                }}
                style={{ marginRight: 10 }}
            >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 5 }}>
                    <Ionicons
                        name="home-outline"
                        size={20}
                        color="white"
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
                    headerTitle: getFocusedRouteNameFromRoute(route) || 'Add Product'
                })}
            />
            <Stack.Screen name="LineChart"
                component={LineChartScreen}
                options={({ route }) => ({
                    headerTitle: getFocusedRouteNameFromRoute(route) || 'Charts'
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
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={HomeNavigator} />
            <Stack.Screen name='AddItem' component={AddItemNavigator} />
        </Stack.Navigator>
    );
};


export default Main;