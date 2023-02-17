import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const LoginModal = ({ visible, setVisible }) => {
    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: 'white', padding: 20, display: visible ? 'flex' : 'none' }}>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Email is required'),
                    password: Yup.string().required('Password is required')
                })}
                onSubmit={values => {
                    console.log(values);
                    navigation.navigate('Home');
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.modalContainer}>
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
                        <Pressable onPress={handleSubmit} style={styles.blueButton}>
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

export default LoginModal;
