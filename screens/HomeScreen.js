import React from 'react';
import { StyleSheet, Text, ScrollView, View, Pressable, } from 'react-native';
import AboutScreen from './AboutScreen';

const HomeScreen = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Production Tracking
            </Text>
            <View>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('AddItemStack')}
                >
                    <Text style={styles.buttonText}>Products</Text>
                </Pressable>
            </View>
            <Text style={{ ...styles.cardDescription, backgroundColor: '#F9FCF3', marginTop: 10 }}>
                Click button above to view the products page and manage all your products with ease. Swipe left to delete, and swipe right to edit.
            </Text>
            <View>
                <AboutScreen />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5BA95',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 30,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cardDescription: {
        fontSize: 16,
        lineHeight: 24,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        textAlign: 'center',
        borderRadius: 10,
        borderColor: '#D79578',
        borderWidth: 2,
    },
    button: {
        padding: 10,
        backgroundColor: 'rgb(106, 163, 137)',
        alignSelf: 'center',
        width: '30%',
        borderRadius: 10
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});


export default HomeScreen;
