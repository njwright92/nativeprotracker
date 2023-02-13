import React, { useState } from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';
import HomeScreen from './HomeScreen';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ProTracker</Text>
            <Button
                title="Login"
                onPress={() => LoginModal}
            />
        </View>
    );
};

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
                <View style={styles.modalContainer}>
                    <Text style={styles.header}>{isRegister ? 'Register' : 'Login'}</Text>
                    <TextInput
                        style={styles.input}
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
                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.toggleButton} onPress={toggleForm}>
                        <Text style={styles.toggleButtonText}>
                            {isRegister ? 'Login' : 'Register'}
                        </Text>
                    </TouchableOpacity>
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
});


export default LoginModal;