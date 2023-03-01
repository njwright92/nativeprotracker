import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addItem } from '../actions/AddItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import formatDate from '../utils/formatDate';

const AddItemForm = () => {
    const dispatch = useDispatch();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        quantity: Yup.number().required('Quantity is required'),
        // date: Yup.date().required('You must include a date'),
    });

    const onSubmit = async (values) => {
        console.log('onSubmit', values, validationSchema.cast(values));

        let item = validationSchema.cast(values);
        item.date = date;
        console.log('addItem', item);
        await dispatch(addItem(item)).unwrap();
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        console.log('on Date Change', currentDate, event, date);
    };

    return (
        <Formik
            initialValues={{ name: '', quantity: '', date: new Date() }}
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
                        title={formatDate(date)}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a date'
                    />
                    {showDatePicker && (
                        <DateTimePicker
                            value={values.date}
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
