import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addItem } from '../actions/AddItem';

const AddItemForm = () => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
    });

    const onSubmit = async (values, { resetForm }) => {
        console.log('onSubmit', values, validationSchema.cast(values));

        let item = validationSchema.cast(values);
        console.log('addItem', item);
        await dispatch(addItem(item));
        resetForm();
    };

    const initialValues = {
        name: '',
    }

    return (
        <Formik
            initialValues={initialValues}
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
                    {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}

                    <Button
                        color='#556B2F'
                        onPress={handleSubmit}
                        title="Submit"
                        accessibilityLabel='Tap me to submit an item'
                    />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red'
    }
});

export default AddItemForm;

