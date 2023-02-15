import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import LoginScreen from './LoginScreen';
import { Image } from 'react-native';

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: 'darkslategray' },
    headerTitle: 'ProTracker',
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    headerLeft: () => (
        <Image
            source={require('../assets/img/block.jpg')}
            style={{ width: 30, height: 30, marginLeft: 10 }}
        />
    )
};

const LoginNavigator = () => {
    const Stack = createStackNavigator();
    return (

        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{ title: 'Login/Register' }}
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
                options={{ title: 'Home' }}
            />
        </Stack.Navigator>
    );
};

const AboutNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='Contact'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Contact'
                component={AboutScreen}
                options={{ title: 'Contact Me' }}
            />
        </Stack.Navigator>
    );
};

const Main = () => {
    return (
        <View
            style={{
                flex: 1,
                paddingTop:
                    Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}
        >
            <Drawer.Navigator
                initialRouteName='Home'
                drawerStyle={{ backgroundColor: 'slategray' }}
                drawerContentOptions={{
                    activeTintColor: 'white',
                    activeBackgroundColor: 'blue',
                    inactiveTintColor: 'black',
                    inactiveBackgroundColor: 'white',
                    labelStyle: {
                        fontSize: 10,
                        marginLeft: 2
                    }
                }}>
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        title: 'Home',
                        drawerIcon: ({ focused, color, size }) => (
                            <Image
                                source={require('../assets/img/block.jpg')}
                                style={{ width: size, height: size }}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name='Login'
                    component={LoginNavigator}
                    options={{
                        title: 'Login/Register',
                        drawerIcon: ({ focused, color, size }) => (
                            <Image
                                source={require('../assets/img/block.jpg')}
                                style={{ width: size, height: size }}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name='Contact'
                    component={AboutNavigator}
                    options={{
                        title: 'About',
                        drawerIcon: ({ focused, color, size }) => (
                            <Image
                                source={require('../assets/img/block.jpg')}
                                style={{ width: size, height: size }}
                            />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

export default Main;