import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addItem } from "../actions/AddItem";

const AddItemForm = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    const item = validationSchema.cast(values);
    await dispatch(addItem(item));
    resetForm();
  };

  const initialValues = {
    name: "",
  };

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
        <View style={styles.container}>
          <Text style={styles.textInputTitle}>Add Product/Item by name</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              placeholder="whatever you want.."
            />
          </View>
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
          <Pressable
            style={{
              backgroundColor: "rgb(137, 168, 234)",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
            onPress={handleSubmit}
            accessibilityLabel="Tap me to submit an item"
          >
            <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
              Submit
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F9FCF3",
  },
  textInputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#D79578",
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
  },
  textInputTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 300,
  },
  errorText: {
    color: "red",
  },
});

export default AddItemForm;
