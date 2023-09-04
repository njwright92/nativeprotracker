import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, ScrollView } from 'react-native';

const LandingPage = ({ navigation }) => {
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.viewStyles}>
                <Text style={styles.title}>Welcome To!</Text>
                <Image source={require('../assets/img/Branding.jpg')} style={styles.imageStyles} />
                <Text style={styles.subHeading}>
                    Revolutionize your task and product management with NativeProTracker.
                    Click the "Next" button to login.
                </Text>
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
                <Image source={require('../assets/img/catchy.jpg')} style={styles.imagePlaceholder} />
                <Text style={styles.subHeading}>Efficient Task and Product Management</Text>
                <Text style={styles.infoText}>
                    Discover the power of NativeProTracker. This ultimate app for managing tasks and products offers real-time data handling and top-notch security. Streamline your workflow and experience high-performance user experiences across all your devices, as this syncs to Google Cloud.
                </Text>
                <Image source={require('../assets/img/business.jpg')} style={styles.imagePlaceholder} />
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
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    imageStyles: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        aspectRatio: 3 / 2,
        resizeMode: 'contain',
        borderRadius: 10
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
        marginVertical: 20,
        paddingHorizontal: 10,
    },
});

export default LandingPage;
