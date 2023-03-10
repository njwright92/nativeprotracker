import React from 'react';
import { StyleSheet, Text, Pressable, ScrollView, Image } from 'react-native';

const ExampleLineChartImage = require('../assets/img/chart.png');

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Production Tracking</Text>
            <Pressable style={styles.card} onPress={() => navigation.navigate('AddItemStack')}>
                <Text style={styles.cardTitle}>Items</Text>
                <Text style={styles.cardDescription}>Add items to track by name date and quantity. Easily view, delete, or update items quantity on this dynamic list.</Text>
            </Pressable>
            <Pressable style={styles.card} onPress={() => navigation.navigate('ChartStack')}>

                <Text style={styles.cardTitle}>Charts</Text>
                <Image source={ExampleLineChartImage} style={styles.cardImage} />
                <Text style={styles.cardDescription}>Production Tracking Chart uses the items on the list to see the quantity produced over time.</Text>

            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFA500',
        paddingHorizontal: 20,
        paddingTop: 30
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    card: {
        backgroundColor: '#778899',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15
    },
    cardImage: {
        width: 250,
        height: 60,
        marginBottom: 5
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5
    },
    cardDescription: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        fontSize: 16,
        color: 'white',
        marginBottom: 10
    },
});

export default HomeScreen;
