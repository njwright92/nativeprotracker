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
            <View style={styles.cardDescription}>
                <Text style={styles.cardText}>
                    Click button above to view the products page and manage all your products with ease. Swipe left to delete, and swipe right to edit.
                </Text>
            </View>
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
        paddingHorizontal: 10,
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
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    cardDescription: {
        backgroundColor: '#F9FCF3',
        borderColor: '#D79578',
        borderWidth: 2,
        marginBottom: 30,
        padding: 10,
        borderRadius: 10
    },
    cardText: {
        fontSize: 16,
        lineHeight: 24,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        padding: 10,
        backgroundColor: 'rgb(106, 163, 137)',
        alignSelf: 'center',
        width: '30%',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        marginBottom: 2
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
