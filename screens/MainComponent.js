import { Platform, View, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import LoginScreen from './LoginScreen';
import { Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const Drawer = createDrawerNavigator();

const screenOptions = ({ navigation }) => ({
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: 'darkslategray' },
    headerTitle: 'ProTracker',
    headerTitleAlign: 'center',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    headerRight: () => (
        <Image
            source={require('../assets/img/block.jpg')}
            style={{ width: 30, height: 30, marginLeft: 10 }}
        />
    ),
    headerLeft: () => (
        <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 5 }}
        >
            <MaterialCommunityIcons name='menu' size={24} color='#fff' />
        </Pressable>
    ),
});


const LoginNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{
                    title: 'Login/Register',
                    ...screenOptions
                }}
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
                options={{
                    title: 'Home',
                    ...screenOptions
                }}
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
                options={{
                    title: 'Contact Me',
                    ...screenOptions
                }}
            />
        </Stack.Navigator>
    );
};

const HomeWithNavigation = withNavigation(props => <HomeScreen {...props} />);

const Main = ({ navigation }) => {
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
                    },
                }}
            >
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        title: 'Home',
                        drawerIcon: ({ size }) => (
                            <Image
                                source={require('../assets/img/block.jpg')}
                                style={{ width: size, height: size }}
                            />
                        ),
                        ...screenOptions
                    }}
                />
                <Drawer.Screen
                    name='Login'
                    component={LoginNavigator}
                    options={{
                        title: 'Login/Register',
                        drawerIcon: ({ size }) => (
                            <Image
                                source={require('../assets/img/block.jpg')}
                                style={{ width: size, height: size }}
                            />
                        ),
                        ...screenOptions
                    }}
                />
                <Drawer.Screen
                    name='Contact'
                    component={AboutNavigator}
                    options={{
                        title: 'About',
                        drawerIcon: ({ size }) => (
                            <Image
                                source={require('../assets/img/block.jpg')}
                                style={{ width: size, height: size }}
                            />
                        ),
                        ...screenOptions
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

export default Main;