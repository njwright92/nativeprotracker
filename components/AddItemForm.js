import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addItem } from '../actions/AddItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

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
        await dispatch(addItem(item));
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
                    {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    <TextInput
                        onChangeText={handleChange('quantity')}
                        onBlur={handleBlur('quantity')}
                        value={values.quantity}
                        placeholder="Quantity"
                        keyboardType="numeric"
                    />
                    {errors.quantity && touched.quantity && (
                        <Text style={styles.errorText}>{errors.quantity}</Text>
                    )}
                    <Button
                        onPress={() => setShowDatePicker(true)}
                        title={moment(date).format('MM/DD/YYYY')}
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
                    <Button
                        color='#556B2F'
                        onPress={handleSubmit}
                        title="Submit"
                        accessibilityLabel='Tap me to submit item'
                    />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginTop: 5,
    },
});

export default AddItemForm;
