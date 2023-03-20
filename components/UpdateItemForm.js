import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateItem } from '../actions/UpdateItem';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UpdateItemForm = ({ itemId, listItems, onCancel }) => {
    const dispatch = useDispatch();
    const item = listItems ? listItems.find((item) => item.id === itemId) : null;
    const [name, setName] = useState(item ? item.name : '');

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
    });

    const handleUpdateItem = () => {
        if (item) {
            dispatch(
                updateItem({
                    id: itemId,
                    name: name,
                }),
            );
        }
        onCancel();
    };

    return (
        <Formik
            initialValues={{ name: item ? item.name : '' }}
            validationSchema={validationSchema}
            onSubmit={handleUpdateItem}
        >
            {({ handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Update Item</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            onBlur={handleBlur('name')}
                        />
                        {touched.name && errors.name && (
                            <Text style={styles.errorText}>{errors.name}</Text>
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            color='blue'
                            title="submit"
                            onPress={handleSubmit}
                        />
                        <Button
                            color='red'
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
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
});

export default UpdateItemForm;
