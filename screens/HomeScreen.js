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
                <Pressable
                    onPress={() => navigation.navigate('AddItemStack')}
                    style={[
                        styles.buttonContainer,
                        {
                            backgroundColor: '#2196F3',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                            elevation: 8,
                        },
                    ]}
                >
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 22,
                            textTransform: 'uppercase',
                            color: 'black'
                        }}
                    >
                        Products
                    </Text>
                </Pressable>

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
    },
    buttonContainer: {
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 2,
        borderColor: 'black',
    },
});

export default HomeScreen;
