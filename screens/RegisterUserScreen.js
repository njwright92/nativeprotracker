import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import { Formik } from 'formik';
import * as yup from 'yup';

const RegisterUserScreen = ({ navigation }) => {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleRegister = (values) => {
        // Check if the user is already registered
        const existingUser = users.find((user) => user.email === values.email);
        if (existingUser) {
            alert('This email address is already registered!');
            return;
        }

        // Register the new user
        const newUser = { name: values.name, email: values.email, password: values.password };
        dispatch(registerUser(newUser));
        alert('Registration successful!');

        // Navigate to the home screen
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={yup.object().shape({
                    name: yup.string().required('Name is required'),
                    email: yup.string().email('Invalid email').required('Email is required'),
                    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                })}
                onSubmit={(values) => handleRegister(values)}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={() => setFieldTouched('name')}
                        />
                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                        />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={values.password}
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                        />
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        <Pressable style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Register</Text>
                        </Pressable>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#eee',
        marginVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        fontSize: 16,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#00008B',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
    },
});

export default RegisterUserScreen;
