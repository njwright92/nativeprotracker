import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {

    return (
        <View style={styles.viewStyles}>
            <Image source={require('../assets/img/block.jpg')} style={styles.imageStyles} />
            <Text style={styles.textStyles}>
                Welcome to ProTracker
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'darkslategray'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    },
    imageStyles: {
        width: 300,
        height: 300
    }
});

export default SplashScreen;
