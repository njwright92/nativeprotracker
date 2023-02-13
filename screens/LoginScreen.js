import React, { useState } from 'react';
import { Platform, View, Text, StyleSheet, Pressable, Modal, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';
import HomeScreen from './HomeScreen';


const LoginModal = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    const handleLogin = () => {
        // Perform login logic here
        // ...

        toggleModal();
    };

    const handleRegister = () => {
        // Perform register logic here
        // ...

        toggleModal();
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'olive',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop:
                Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
        }}>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: 'white',
                        borderColor: 'Blue',
                        backgroundColor: 'black'
                    }}>{isRegister ? 'Register' : 'Login'}
                    </Text>
                    <TextInput
                        style={{
                        }}
                        placeholder="Username"
                        onChangeText={setUsername}
                        value={username}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                    />
                    {isRegister ? (
                        <Pressable style={styles.button} onPress={handleRegister}>
                            <Text style={styles.text}>Register</Text>
                        </Pressable>
                    ) : (
                        <Button
                            title="Login"
                            onPress={handleLogin}
                        />
                    )}
                    <Pressable style={styles.toggleButton} onPress={toggleForm}>
                        <Text style={styles.toggleButtonText}>
                            {isRegister ? 'Login' : 'Register'}
                        </Text>
                    </Pressable>
                </View>
            </Modal>
            <Text>ProTracker</Text>
            <Button
                title="Login"
                onPress={toggleModal}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'olive',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'red',
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default LoginModal;