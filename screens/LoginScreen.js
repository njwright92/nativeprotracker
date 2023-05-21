import { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions } from 'react-native';
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

const windowWidth = Dimensions.get('window').width;

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
                    Important! Registration is free and no user data is collected!
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
                        - Here are a couple examples of what you can do with this app after you register.
                    </Text>
                    <Text style={{ margin: 5, fontWeight: 'bold' }}>
                        - Full About and info are on the next screen.
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 2 }}>
                        <Text style={{ margin: 7, fontWeight: 'bold', alignItems: 'center' }}>Business</Text>
                        <Image
                            source={require('../assets/img/exChart.png')}
                            style={styles.image}
                        />
                        <Image
                            source={require('../assets/img/exlist.png')}
                            style={[styles.image, { width: 270, height: 100 }]}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 2 }}>
                        <Text style={{ margin: 7, fontWeight: 'bold', alignItems: 'center' }}>Personal</Text>
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
                    Important! Registration is free and no user data is collected!
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
                    - Here are a couple examples of what you can do with this app after you register.
                </Text>
                <Text style={{ margin: 5, fontWeight: 'bold' }}>
                    - Full About and info are on the next screen.
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 2 }}>
                    <Text style={{ margin: 7, fontWeight: 'bold', alignItems: 'center' }}>Business</Text>
                    <Image
                        source={require('../assets/img/exChart.png')}
                        style={styles.image}
                    />
                    <Image
                        source={require('../assets/img/exlist.png')}
                        style={[styles.image, { width: 270, height: 100 }]}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 2 }}>
                    <Text style={{ margin: 7, fontWeight: 'bold', alignItems: 'center' }}>Personal</Text>
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
    },
    container: {
        flexDirection: windowWidth > 768 ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginRight: 2,
    },
    noticeText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#FFA500', 
        marginBottom: 10,
        backgroundColor: 'black'
    },
    image: {
        width: 150,
        height: 150,
        margin: 2,
    },
});

export default LoginScreen;