import react, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CheckBox, Input, Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { login } from '../actions/login';

const LoginTab = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = () => {
        console.log('username:', username);
        console.log('password:', password);
        console.log('remember:', remember);

        const user = {
            username,
            password,
            remember,
        };

        if (remember) {
            dispatch(login(user));
        } else {
            dispatch(login(user));
        }

        navigation.navigate('Main');
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Username"
                leftIcon={
                    <MaterialCommunityIcons
                        name="account"
                        size={24}
                        color="black"
                        style={styles.icon}
                    />
                }
                onChangeText={(text) => setUsername(text)}
                value={username}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input
                placeholder="Password"
                leftIcon={
                    <MaterialCommunityIcons
                        name="key"
                        size={24}
                        color="black"
                        style={styles.icon}
                    />
                }
                onChangeText={(text) => setPassword(text)}
                value={password}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <CheckBox
                title="Remember Me"
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
                <Button
                    onPress={() => handleLogin()}
                    title="Login"
                    icon={
                        <MaterialCommunityIcons
                            name="login"
                            size={24}
                            color="white"
                            style={styles.icon}
                        />
                    }
                    buttonStyle={{ backgroundColor: '#5637DD' }}
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    title="Register"
                    type="clear"
                    icon={
                        <MaterialCommunityIcons
                            name="account-plus"
                            size={24}
                            color="blue"
                            style={styles.icon}
                        />
                    }
                    titleStyle={{ color: 'blue' }}
                />
            </View>
        </View>
    );
};

const RegisterTab = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const user = {
        username,
        password,
    };

    const handleRegister = () => {
        const userInfo = {
            username,
            password,

        };
        console.log(JSON.stringify(userInfo));

        dispatch(login(user));

        navigation.navigate('Main');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={<MaterialCommunityIcons name='account' size={24} color='black' />}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={<MaterialCommunityIcons name='lock' size={24} color='black' />}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => handleRegister()}
                        title='Register'
                        color='#5637DD'
                        icon={
                            <MaterialCommunityIcons
                                name='account-plus-outline'
                                color='#fff'
                                size={24}
                            />
                        }
                        buttonStyle={{ backgroundColor: '#5637DD' }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const Tab = createBottomTabNavigator();

const LoginScreen = () => {
    const tabBarOptions = {
        activeBackgroundColor: 'darkslategray',
        inactiveBackgroundColor: 'lightslategray',
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        labelStyle: { fontSize: 16 },
    };

    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name='Login'
                component={LoginTab}
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <MaterialCommunityIcons
                                name='login-variant'
                                size={26}
                                color={props.color}
                            />
                        );
                    }
                }}
            />
            <Tab.Screen
                name='Register'
                component={RegisterTab}
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <MaterialCommunityIcons
                                name='account-plus-outline'
                                size={26}
                                color={props.color}
                            />
                        );
                    }
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10,
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8,
        height: 60
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
});

export default LoginScreen;