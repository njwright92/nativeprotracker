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
        color: '#black',
        fontSize: 45,
        fontWeight: 'bold'
    },
    imageStyles: {
        width: 400,
        height: 150,
        borderRadius: 10
    }
});

export default SplashScreen;
