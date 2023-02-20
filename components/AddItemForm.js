import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AddItemForm = ({ onSubmit }) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        quantity: Yup.number().required('Quantity is required'),
    });

    return (
        <Formik
            initialValues={{ name: '', quantity: '' }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
            }) => (
                <View>
                    <TextInput
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder="Name"
                    />
                    {errors.name && touched.name && <Text>{errors.name}</Text>}
                    <TextInput
                        onChangeText={handleChange('quantity')}
                        onBlur={handleBlur('quantity')}
                        value={values.quantity}
                        placeholder="Quantity"
                        keyboardType="numeric"
                    />
                    {errors.quantity && touched.quantity && (
                        <Text>{errors.quantity}</Text>
                    )}
                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
    );
};

export default AddItemForm;
