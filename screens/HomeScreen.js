import React from 'react';
import { StyleSheet, Text, ScrollView, View, Pressable, Image } from 'react-native';
import AboutScreen from './AboutScreen';

const HomeScreen = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Production Tracking
                <Image
                    source={require('../assets/img/appLogo.jpg')}
                    style={{
                        width: 80, // Set the width and height of the logo as per your requirement
                        height: 50,
                        marginLeft: 10,
                    }}
                />
            </Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('AddItemStack')}
                >
                    <Text style={styles.buttonText}>Products</Text>

                </Pressable>
            </View>
            <Text style={{ ...styles.cardDescription, backgroundColor: 'white', marginTop: 10 }}>
                Click to view the products page and manage all your products with ease. Swipe left to delete, and swipe right to edit.
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
        backgroundColor: '#778899',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#FFFFF0',
        borderRadius: 1,
        padding: 20,
        marginBottom: 15,
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 18,
        color: '#333333',
        padding: 4,
        textAlign: 'center',
        color: 'black',
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        alignSelf: 'center',
        width: '35%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});

export default HomeScreen;
