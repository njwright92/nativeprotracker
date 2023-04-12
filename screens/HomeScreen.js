import React from 'react';
import { StyleSheet, Text, Pressable, ScrollView, View } from 'react-native';
import AboutScreen from './AboutScreen';

const HomeScreen = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Production Tracking
            </Text>
            <Pressable style={styles.card}
                onPress={() => navigation.navigate('AddItemStack')}>
                <Text style={styles.cardTitle}>
                    Products
                </Text>
                <Text style={styles.cardDescription}>
                    Click to view products page, manage all your products with ease swipe left to delete right to edit.
                </Text>
            </Pressable>
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
        paddingTop: 30
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20
    },
    card: {
        backgroundColor: '#FFFFF0',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    cardDescription: {
        fontSize: 18,
        color: '#333333',
        padding: 4,
        textAlign: 'center'
    }
});

export default HomeScreen;
