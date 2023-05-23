import { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged
}
    from "firebase/auth";
import { logEvent } from '@firebase/analytics';
import GoogleSignInButton from '../ReactGoogleSignIn';

const LoginTab = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth();

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Login error', 'Incorrect username or password.');
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                logEvent();
                navigation.navigate('Main');
            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                    setError('Incorrect username or password');
                } else {
                    setError('An error occurred during login');
                }
            });
    };

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent. Please check your inbox.');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

                if (errorCode === 'auth/invalid-email') {
                    setError('Please enter a valid email address.');
                } else if (errorCode === 'auth/user-not-found') {
                    setError('User with the provided email address does not exist.');
                } else {
                    setError(errorMessage);
                }
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

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.noticeText}>
                    Important! Registration is free!
                </Text>

                <View style={styles.formInput}>
                    <Ionicons name='mail' size={24} color='black' style={styles.formIcon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Email'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}
                <View style={styles.formInput}>
                    <Ionicons name='key' size={24} color='black' style={styles.formIcon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>

                <View>
                    <Button
                        onPress={() => handleLogin()}
                        title="Login"
                        icon={
                            <Ionicons
                                name="log-in-outline"
                                size={24}
                                color="white"
                                style={styles.icon}
                            />
                        }
                        buttonStyle={{ backgroundColor: '#5637DD' }}
                    />
                </View>
                <View style={{ marginTop: 5 }}>

                    <GoogleSignInButton />
                </View>

                <View style={{ marginTop: 7 }}>
                    <Text
                        onPress={() => handleResetPassword()}
                        style={styles.resetPasswordLink}
                    >
                        Reset Password
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}>
                    - Here are a couple examples of what you can do with this app after you register.
                </Text>
                <Text style={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}>
                    - Full About and info are on the next screen.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 2 }}>
                    <Text style={styles.text}>Business</Text>
                    <Image
                        source={require('../assets/img/exChart.png')}
                        style={styles.image}
                    />
                    <Image
                        source={require('../assets/img/exlist.png')}
                        style={[styles.image, { width: 198, height: 70 }]}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 2 }}>
                    <Text style={styles.text}>Personal</Text>
                    <Image
                        source={require('../assets/img/items6.jpg')}
                        style={styles.image}
                    />
                    <Image
                        source={require('../assets/img/entries3.jpg')}
                        style={styles.image}
                    />
                </View>
            </View>
        </ScrollView>

    );
};

const RegisterTab = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth();

    const handleRegister = () => {
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])([A-Za-z\d@$!%*?&^(){}[\]:;<>,.~`_+-=|\\\/]){7,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                'Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
            );
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                logEvent();
                navigation.navigate('Main');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === 'auth/email-already-in-use') {
                    setError('Email address is already in use');
                } else {
                    setError('An error occurred during registration');
                }
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.noticeText}>
                    Important! Registration is free!
                </Text>
                <View style={styles.formInput}>
                    <Ionicons name='mail' size={24} color='black' style={styles.formIcon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Email'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>

                <View style={styles.formInput}>
                    <Ionicons name='key' size={24} color='black' style={styles.formIcon} />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>
                <View>
                    <Button
                        onPress={() => handleRegister()}
                        title='Register'
                        color='#5637DD'
                        icon={
                            <Ionicons
                                name='person-add-outline'
                                color='#fff'
                                size={24}
                            />
                        }
                        buttonStyle={{ backgroundColor: '#5637DD' }}
                    />
                </View>
            </View>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <View style={styles.container} >
                <Text style={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}>
                    - Here are a couple examples of what you can do with this app after you register.
                </Text>
                <Text style={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}>
                    - Full About and info are on the next screen.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 2 }}>
                    <Text style={styles.text}>Business</Text>
                    <Image
                        source={require('../assets/img/exChart.png')}
                        style={styles.image}
                    />
                    <Image
                        source={require('../assets/img/exlist.png')}
                        style={[styles.image, {}]}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 2 }}>
                    <Text style={styles.text}>Personal</Text>
                    <Image
                        source={require('../assets/img/items6.jpg')}
                        style={styles.image}
                    />
                    <Image
                        source={require('../assets/img/entries3.jpg')}
                        style={styles.image}
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
                            <Ionicons
                                name='log-in-outline'
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
                            <Ionicons
                                name='person-add-outline'
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
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5DC',

    },
    formInput: {
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        alignItems: 'center',
        marginBottom: 7
    },
    formIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
    },
    container: {
        marginVertical: 10
    },
    noticeText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFA500',
        marginBottom: 15,
        backgroundColor: 'black'
    },
    image: {
        height: 95,
        width: 95,
        marginRight: 2,
    },
    text: {
        margin: 7,
        fontWeight: 'bold',
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: 'black',
    },
    resetPasswordLink: {
        color: 'red',
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

export default LoginScreen;