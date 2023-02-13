import { StyleSheet, View, Text } from 'react-native'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Products, Tracking, charts, and snapshot report</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',

    },
});

export default HomeScreen;