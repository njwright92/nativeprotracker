import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import RegisterModal from '../components/RegisterModal';
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/userActions';

const RegisterScreen = ({ navigation }) => {
    const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
    const dispatch = useDispatch();

    const hideModals = () => {
        setRegisterModalVisible(false);
    };

    const toggleRegisterModal = () => {
        setRegisterModalVisible(!isRegisterModalVisible);
    };

    const handleRegister = (name, email, password) => {
        dispatch(registerUser(name, email, password));
        navigation.navigate('Profile');
    };

    return (
        <TouchableWithoutFeedback onPress={hideModals}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3498db' }}>
                <Text onPress={toggleRegisterModal} style={styles.container}>Register</Text>
                <RegisterModal visible={isRegisterModalVisible} setVisible={setRegisterModalVisible} onRegister={handleRegister} />
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

export default RegisterScreen;

