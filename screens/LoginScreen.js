import { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
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
                    Important Notice: Registration is free and no user data is collected
                </Text>
                <Input
                    placeholder="Email"
                    leftIcon={
                        <Ionicons
                            name="mail"
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
                        <Ionicons
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
                <View>
                    <Button
                        onPress={() => handleResetPassword()}
                        title="Reset Password"
                        type="clear"
                        icon={
                            <Ionicons
                                name="lock-closed-outline"
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
                            <Ionicons
                                name="person-add-outline"
                                size={24}
                                color="black"
                                style={styles.icon}
                            />
                        }
                        titleStyle={{ color: 'green', fontWeight: 'bold' }}
                    />
                </View>

                <View >
                    <Text style={{ margin: 10, fontWeight: 'bold' }}>
                        Here are a couple examples of what you can do with this app after you register:
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                        <Text style={{ margin: 10, fontWeight: 'bold' }}>Business</Text>
                        <Image
                            source={require('../assets/img/exChart.png')}
                            style={{ width: 150, height: 150, margin: 10 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                        <Text style={{ margin: 10, fontWeight: 'bold' }}>Personal</Text>
                        <Image
                            source={require('../assets/img/items2.png')}
                            style={{ width: 150, height: 150, margin: 10 }}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>

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
        } const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])([A-Za-z\d@$!%*?&^(){}[\]:;<>,.~`_+-=|\\\/]){7,}$/;

        if (!passwordRegex.test(password)) {
            alert('Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)');
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.noticeText}>
                    Important Notice: Registration is free and no user data is collected
                </Text>

                <Input
                    placeholder='Email'
                    leftIcon={<Ionicons name='mail' size={24} color='black' />}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={<Ionicons name='key' size={24} color='black' />}
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

            <View >
                <Text style={{ margin: 10, fontWeight: 'bold' }}>
                    Here are a couple examples of what you can do with this app after you register:
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                    <Text style={{ margin: 10, fontWeight: 'bold' }}>Business</Text>
                    <Image
                        source={require('../assets/img/exChart.png')}
                        style={{ width: 150, height: 150, margin: 10 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                    <Text style={{ margin: 10, fontWeight: 'bold' }}>Personal</Text>
                    <Image
                        source={require('../assets/img/items2.png')}
                        style={{ width: 150, height: 150, margin: 10 }}
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
        paddingBottom: 20, // Add padding to the bottom to prevent content from being cut off
    },
    container: {
        justifyContent: 'center',
        margin: 10,
    },
    noticeText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFA500', // Orange color
        marginBottom: 10,
        backgroundColor: '#f2f2f2', // Light gray background color
    },

});

export default LoginScreen;