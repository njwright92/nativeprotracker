import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateItem } from '../actions/UpdateItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';


const UpdateItemForm = ({ itemId, listItems, onCancel }) => {
    const dispatch = useDispatch();
    const item = listItems ? listItems.find((item) => item.id === itemId) : null;
    const [quantity, setQuantity] = useState(item ? item.quantity.toString() : '');
    const [showDatePicker, setShowDatePicker] = useState(false);
    console.log('UDPATE INIT', item)
    const [date, setDate] = useState(new Date());

    const validationSchema = Yup.object().shape({
        quantity: Yup.number().required('Quantity is required'),
    });

    const handleUpdateItem = () => {
        if (item) {
            console.log('handleUpdateItem', date);
            dispatch(
                updateItem({
                    id: itemId,
                    name: `${item.name.split('(')[0]}`,
                    date: moment(date).toDate(),
                    quantity: parseInt(quantity),
                }),
            );
        }
        onCancel();
    };

    const onDateChange = async (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        await setDate(selectedDate || date);
        console.log('onDateChange', event, selectedDate, date);
    };

    return (
        <Formik
            initialValues={{ quantity }}
            validationSchema={validationSchema}
            onSubmit={handleUpdateItem}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Update Item</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Quantity:</Text>
                        <TextInput
                            style={styles.input}
                            value={quantity}
                            onChangeText={(text) => setQuantity(text)}
                            onBlur={handleBlur('quantity')}
                            keyboardType="numeric"
                        />
                        {touched.quantity && errors.quantity && (
                            <Text style={styles.errorText}>{errors.quantity}</Text>
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Date:</Text>
                        <Button
                            color='#5637DD'
                            title={moment(date).format('MM/DD/YYYY')}
                            onPress={() => setShowDatePicker(true)}
                            accessibilityLabel='Tap me to select a date'
                        />
                    </View>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                    <View style={styles.buttonContainer}>
                        <Button
                            color='#556B2F'
                            title="Update"
                            onPress={handleSubmit}
                        />
                        <Button
                            color='maroon'
                            title="Cancel"
                            onPress={onCancel}
                        />
                    </View>
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 2,
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    date: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        color: 'white',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});

export default UpdateItemForm;
