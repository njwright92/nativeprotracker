import React from 'react';
import { StyleSheet, Text, Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log('User signed out successfully.');
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.log('Error signing out:', error);
            });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Production Tracking</Text>
            <Pressable style={styles.card} onPress={() => navigation.navigate('AddItemStack')}>
                <Text style={styles.cardTitle}>Products</Text>
                <Text style={styles.cardDescription}>click to view products page, add items to your list. swipe left to delete, right to edit. Add quantity and date entries to your products. Track the production on the line charts.</Text>
            </Pressable>
            <View style={styles.signoutContainer}>
                <Pressable onPress={handleSignOut}>
                    <Ionicons name="exit-outline" size={30} color="black" />
                </Pressable>
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
    signoutContainer: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end'
    }
});

export default HomeScreen;
