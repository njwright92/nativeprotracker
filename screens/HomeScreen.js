import React from 'react';
import { StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const HomeScreen = ({ navigation }) => {

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Production Tracking</Text>
            <Pressable style={styles.card} onPress={() => navigation.navigate('AddItemStack')}>
                <Text style={styles.cardTitle}>Products</Text>
                <Text style={styles.cardDescription}>This card takes you to the products page where you can add items to your list. To remove an item, swipe left. To edit, swipe right. Start by entering the name of a product and then select it to add a quantity and date entry. The line chart displays your production over time. Simply select a product to add an entry and follow the link to view the line chart.</Text>
            </Pressable>
            <Pressable>
                <Ionicons name="exit-outline" size={30} color="black" />
            </Pressable>
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
        fontSize: 24,
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
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10
    },
    cardDescription: {
        fontSize: 18,
        color: '#333333',
        padding: 4
    },
});

export default HomeScreen;
