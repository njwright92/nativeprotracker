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
                    Important! Registration is free!
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
            </View>

            <View style={styles.container}>
                <Text style={{ marginTop: 5, marginBottom: '5', fontWeight: 'bold' }}>
                    - Here are a couple examples of what you can do with this app after you register.
                </Text>
                <Text style={{ marginTop: 5, marginBottom: '5', fontWeight: 'bold' }}>
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
                    Important! Registration is free!
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

            <View style={styles.container} >
                <Text style={{ marginTop: 5, marginBottom: '5', fontWeight: 'bold' }}>
                    - Here are a couple examples of what you can do with this app after you register.
                </Text>
                <Text style={{ marginTop: 5, marginBottom: '5', fontWeight: 'bold' }}>
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
        maxWidth: '1000',
    },
    container: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10,
        maxWidth: '1000'
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
});

export default LoginScreen;