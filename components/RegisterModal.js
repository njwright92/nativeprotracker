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
                        <TextInput style={styles.input}
                            placeholder="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}
                        <TextInput style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        <TextInput style={styles.input}
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        {errors.password && touched.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                        <Pressable onPress={handleSubmit} style={styles.submitButton}>
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
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        fontSize: 16
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center'
    },
    submitButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default RegisterModal;
