import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const LandingPage = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.viewStyles}>
                <Text style={styles.title}>Welcome to Native Pro Tracker!</Text>
                <Text style={styles.slogan}>Track Infinitely</Text>
                <Image source={require('../assets/img/Branding.jpg')} style={styles.imageStyles} />
                <Text style={styles.subHeading}>
                    Get your life organized the smart way. Tap "Next" to start.
                </Text>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
                <Image source={require('../assets/img/catchy.jpg')} style={styles.imagePlaceholder} />
                <Text style={styles.subHeading}>Why Native Pro Tracker?</Text>
                <Text style={styles.infoText}>
                    Imagine an app that's your ultimate wingman for managing tasks and products. That's us. Real-time updates, military-grade security, and super-fast on all your devices. And yeah, we run on Google Cloud so you know we're legit.
                </Text>
                <Image source={require('../assets/img/business.jpg')} style={styles.imagePlaceholder} />
                <Text style={styles.infoText}>
                    From small businesses to personal projects, Native Pro Tracker is your go-to. Keep an eye on your inventory, plan your day, or track your personal projects; do it all effortlessly.
                </Text>
                <Text style={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}>
                    Here's a sneak peek of what you can do once you're in:
                </Text>

                <Text style={styles.subHeading}>Business</Text>
                <Text style={styles.infoText}>
                    Track the production and inventory of whatever you produce. Stay ahead of your business operations in real-time.
                </Text>
                <Image
                    source={require('../assets/img/exChart.png')}
                    style={styles.image}
                />
                <Image
                    source={require('../assets/img/exlist.png')}
                    style={[styles.image, { marginvertical: -20 }]}
                />
                <Text style={styles.subHeading}>Personal</Text>
                <Text style={styles.infoText}>
                    Keep track of tasks, projects, and items to help you be organized on the go. Simplify your life one tap at a time.
                </Text>
                <Image
                    source={require('../assets/img/entries.jpg')}
                    style={[styles.image, { marginBottom: 20 }]}
                />
                <Image
                    source={require('../assets/img/charts.jpg')}
                    style={[styles.image, { marginBottom: 20 }]}
                />
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5BA95'
    },
    title: {
        color: 'black',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    slogan: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    image: {
        width: '80%',
        aspectRatio: 3 / 2,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    imageStyles: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        aspectRatio: 3 / 2,
        resizeMode: 'contain',
        borderRadius: 10,
        marginVertical: -20
    },
    button: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'rgb(106, 163, 137)',
        width: '30%',
        borderRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    imagePlaceholder: {
        width: '100%',
        aspectRatio: 3 / 2,
        resizeMode: 'contain',
        borderRadius: 10,
        marginVertical: 20,
    },
    subHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginVertical: 10,
    },
    infoText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginVertical: 10,
        paddingHorizontal: 5,
    },
});

export default LandingPage;
