import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import LoginModal from '../components/LoginModal';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/userActions';

const LoginScreen = ({ navigation }) => {
    const [isLoginModalVisible, setLoginModalVisible] = useState(false);
    const dispatch = useDispatch();

    const hideModals = () => {
        setLoginModalVisible(false);
    };

    const toggleLoginModal = () => {
        setLoginModalVisible(!isLoginModalVisible);
    };

    const handleLogin = (email, password) => {
        dispatch(loginUser(email, password));
        navigation.navigate('Profile');
    };

    return (
        <TouchableWithoutFeedback onPress={hideModals}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFA500' }}>
                <Text onPress={toggleLoginModal} style={styles.container}>Login</Text>
                <LoginModal visible={isLoginModalVisible} setVisible={setLoginModalVisible} onLogin={handleLogin} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        fontSize: 30,
        color: 'black'
    }
});

export default LoginScreen;
