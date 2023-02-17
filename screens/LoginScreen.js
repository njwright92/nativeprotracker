import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

const LoginScreen = () => {
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);

    const hideModals = () => {
        setLoginModalVisible(false);
        setRegisterModalVisible(false);
    };

    const toggleLoginModal = () => {
        setLoginModalVisible(!isLoginModalVisible);
        setRegisterModalVisible(false);
    };

    const toggleRegisterModal = () => {
        setRegisterModalVisible(!isRegisterModalVisible);
        setLoginModalVisible(false);
    };

    return (
        <TouchableWithoutFeedback onPress={hideModals}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00008B' }}>
                <Text onPress={toggleLoginModal} style={styles.container}>Login</Text>
                <Text onPress={toggleRegisterModal} style={styles.container}>Register</Text>
                <LoginModal visible={isLoginModalVisible} setVisible={setLoginModalVisible} />
                <RegisterModal visible={isRegisterModalVisible} setVisible={setRegisterModalVisible} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        fontSize: 30,
        color: 'white'
    }
});

export default LoginScreen;
