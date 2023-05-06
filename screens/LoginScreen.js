import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged
}
    from "firebase/auth";
import { logEvent } from '@firebase/analytics';

const LoginTab = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();

    const handleLogin = () => {
        if (!email || !password) {
            setError('Please enter a valid email and password');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                logEvent;
                navigation.navigate('Main');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                console.log(errorCode, errorMessage);
            });

    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate('Main');
            }
        });

        return unsubscribe;
    }, []);

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent. Please check your inbox.');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Email"
                leftIcon={
                    <MaterialCommunityIcons
                        name="email"
                        size={24}
                        color="black"
                        style={styles.icon}
                    />
                }
                onChangeText={(text) => setEmail(text)}
                value={email}
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
                secureTextEntry={true}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <View>
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
            <View>
                <Button
                    onPress={() => handleResetPassword()}
                    title="Reset Password"
                    type="clear"
                    icon={
                        <MaterialCommunityIcons
                            name="lock-reset"
                            size={24}
                            color="red"
                            style={styles.icon}
                        />
                    }
                    titleStyle={{ color: 'red' }}
                />
            </View>
            <View>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    title="Register"
                    type="clear"
                    icon={
                        <MaterialCommunityIcons
                            name="account-plus"
                            size={24}
                            color="black"
                            style={styles.icon}
                        />
                    }
                    titleStyle={{ color: 'green', fontWeight: 'bold' }}
                />
            </View>
        </View>
    );
};

const RegisterTab = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();

    const handleRegister = () => {
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)');
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === 'auth/email-already-in-use') {
                    alert('Email address is already in use');
                } else {
                    console.log(errorCode, errorMessage);
                }
            });
        logEvent;
        navigation.navigate('Main');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Input
                    placeholder='Email'
                    leftIcon={<MaterialCommunityIcons name='email' size={24} color='black' />}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={<MaterialCommunityIcons name='key' size={24} color='black' />}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <View>
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

});

export default LoginScreen;