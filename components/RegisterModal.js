import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const RegisterModal = ({ visible, setVisible }) => {
    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: 'white', padding: 20, display: visible ? 'flex' : 'none' }}>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Name is required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                        .min(6, 'Password must be at least 6 characters')
                })}
                onSubmit={values => {
                    console.log(values);
                    navigation.navigate('Home');
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View styles={styles.modalContainer}>
                        <TextInput styles={styles.input}
                            placeholder="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        {errors.name && touched.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
                        <TextInput styles={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                        <TextInput styles={styles.input}
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        {errors.password && touched.password && (
                            <Text style={{ color: 'red' }}>{errors.password}</Text>
                        )}
                        <Pressable onPress={handleSubmit} style={styles.redButton}>
                            <Text style={styles.buttonText}>Submit</Text>
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
    },
    blueButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    redButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 5,
        borderColor: '#2F4F4F',
        padding: 10,
        marginBottom: 10,
    },
});

export default RegisterModal;