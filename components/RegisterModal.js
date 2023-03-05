import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/userActions';

const RegisterModal = ({ visible, onClose, error }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            await dispatch(registerUser(values));
            navigation.navigate('ProfileScreen');
        } catch (err) {
            console.log(err);
        }
    };

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
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        {errors.password && touched.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                        <View style={styles.buttonContainer}>
                            <Button title="Register" onPress={handleSubmit} color="#1C1C4D" />
                            <Button title="Cancel" onPress={onClose} color="red" />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    }
});

export default RegisterModal;
