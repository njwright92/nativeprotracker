import { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { GoogleSignInButton } from '../GoogleSignIn';

const LoginTab = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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
        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Password Reset', 'Password reset email sent. Please check your inbox.');
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/invalid-email') {
                    setError('Please enter a valid email address.');
                } else if (errorCode === 'auth/user-not-found') {
                    setError('User with the provided email address does not exist.');
                } else {
                    setError('An error occurred while sending the password reset email.');
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
                <Image
                    source={require('../assets/img/Branding.jpg')}
                    style={{
                        width: 240,
                        height: 95,
                        borderRadius: 10
                    }}
                />

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
                    <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>
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

                <View style={{ marginBottom: 2 }}>
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
                        buttonStyle={{ backgroundColor: 'rgb(137, 168, 234)' }}
                    />

                </View>

                <GoogleSignInButton />

                <View style={{ marginTop: 2 }}>
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
                        source={require('../assets/img/Items2.PNG')}
                        style={[styles.image, { width: 100, height: 150 }]}
                    />
                    <Image
                        source={require('../assets/img/Entries2.PNG')}
                        style={[styles.image, { width: 100, height: 150 }]}
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
                <Image
                    source={require('../assets/img/Branding.jpg')}
                    style={{
                        width: 240,
                        height: 100,
                        borderRadius: 10
                    }}
                />
                <Text style={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}>
                    - Full About and info are on the next screen.
                </Text>
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
                    <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>
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
                        buttonStyle={{ backgroundColor: 'rgb(106, 163, 137)' }}
                    />
                </View>
            </View>
            {error ? (
                <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>
            ) : null}
            <GoogleSignInButton />
            <View style={styles.container} >
                <Text style={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}>
                    - Here are a couple examples of what you can do with this app after you register.
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
                        source={require('../assets/img/Items2.PNG')}
                        style={[styles.image, { width: 100, height: 150 }]}
                    />
                    <Image
                        source={require('../assets/img/Entries2.PNG')}
                        style={[styles.image, { width: 100, height: 150 }]}
                    />
                </View>
            </View>
        </ScrollView>

    );
};

const Tab = createBottomTabNavigator();

const LoginScreen = () => {
    const tabBarOptions = {
        activeBackgroundColor: 'rgb(137, 168, 234)',
        inactiveBackgroundColor: 'rgb(106, 163, 137)',
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
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5BA95',
    },
    formInput: {
        flexDirection: 'row',
        borderColor: '#D79578',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'white'
    },
    formIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        color: 'black',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justify: 'center',
        maxWidth: 700
    },
    noticeText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFA500',
        marginBottom: 5,
        backgroundColor: 'black'
    },
    noticeText2: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        marginBottom: 7,
    },
    image: {
        height: 95,
        width: 95,
        margin: 3,
        borderRadius: 10,
        borderColor: 'black', 
        borderWidth: 2
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
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

export default LoginScreen;