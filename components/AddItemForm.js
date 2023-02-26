import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addItem } from '../actions/AddItem';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddItemForm = () => {
    const dispatch = useDispatch();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        quantity: Yup.number().required('Quantity is required'),
    });

    const onSubmit = async (values) => {
        const formattedDate = date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
        const item = {
            name: `${values.name} (${formattedDate})`,
            quantity: parseInt(values.quantity),
        };
        await dispatch(addItem(item)).unwrap();
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

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
                    <Button
                        onPress={() => setShowDatePicker(true)}
                        title={date.toLocaleDateString('en-US')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a date'
                    />
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode='date'
                            display='default'
                            onChange={onDateChange}
                        />
                    )}
                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
    );
};

export default AddItemForm;
