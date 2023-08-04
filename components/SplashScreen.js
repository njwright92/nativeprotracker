import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {

    return (
        <View style={styles.viewStyles}>
            <Text style={styles.textStyles}>
                Welcome to ProTracker!
            </Text>
            <Image source={require('../assets/img/Branding.jpg')} style={styles.imageStyles} />
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5BA95'
    },
    textStyles: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#black',
        fontSize: 45,
        fontWeight: 'bold',
        margin: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
    imageStyles: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        height: 150,
        borderRadius: 10,
        margin: 10
    }
});

export default SplashScreen;
