import React from 'react';
import { StyleSheet, Text, Pressable, ScrollView } from 'react-native';


const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Production Tracking</Text>
            <Pressable style={styles.card} onPress={() => navigation.navigate('AddItemStack')}>
                <Text style={styles.cardTitle}>Products</Text>
                <Text style={styles.cardDescription}>Add products to this dynamic list by name. Then you can select individual products to add a quantity and date entry. Also View the production over time on a line chart.</Text>
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
    cardTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5
    },
    cardDescription: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10
    },
});

export default HomeScreen;
