import React from 'react';
import { StyleSheet, Text, Pressable, ScrollView, Image } from 'react-native';

const ExampleLineChartImage = require('../assets/img/chart.png');

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Track item Production & View on Charts </Text>
            <Pressable style={styles.card} onPress={() => navigation.navigate('ChartStack')}>
                <Image source={ExampleLineChartImage} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Charts</Text>
                <Text style={styles.cardDescription}>View production tracking charts</Text>
            </Pressable>

            <Pressable style={styles.card} onPress={() => navigation.navigate('AddItemStack')}>
                <Text style={styles.cardTitle}>Add Item</Text>
                <Text style={styles.cardDescription}>Add, update ,or delete items to the production tracking system</Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFA500',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    cardImage: {
        width: 200,
        height: 50,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 16,
        color: 'gray',
    },
});

export default HomeScreen;
