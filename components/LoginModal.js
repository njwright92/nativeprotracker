import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { CheckBox, } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/userActions';
import * as SecureStore from 'expo-secure-store';

const LoginModal = ({ visible, setVisible, onLogin }) => {
    const dispatch = useDispatch();
    const [remember, setRemember] = useState(false);

    const handleLogin = (email, password) => {
        dispatch(loginUser(email, password));
        onLogin();
        setVisible(false);
    };

    const handleRemember = () => {
        setRemember(!remember);
    };

    return (
        <View style={{ backgroundColor: 'white', padding: 20, display: visible ? 'flex' : 'none' }}>
            <Formik
                initialValues={{ email: '', password: '', remember: false }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Invalid email address').required('Email is required'),
                    password: Yup.string().required('Password is required'),
                })}
                onSubmit={(values) => {
                    handleLogin(values.email, values.password);
                    if (values.remember) {
                        SecureStore.setItemAsync(
                            'userinfo',
                            JSON.stringify({
                                email: values.email,
                                password: values.password,
                            })
                        ).catch((error) => console.log('Could not save user info', error));
                    } else {
                        SecureStore.deleteItemAsync('userinfo').catch((error) =>
                            console.log('Could not delete user info', error)
                        );
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, handleRemember }) => (
                    <View style={styles.modalContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        {errors.password && touched.password && (
                            <Text style={{ color: 'red' }}>{errors.password}</Text>
                        )}
                        <CheckBox
                            title="Remember me"
                            checked={values.remember}
                            onPress={() => setFieldValue('remember', !values.remember)}
                            containerStyle={styles.checkboxContainer}
                        />
                        <Pressable onPress={handleSubmit} style={styles.blueButton}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    blueButton: {
        backgroundColor: '#61dafb',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default LoginModal;
