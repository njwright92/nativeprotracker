import { StyleSheet, View, Text } from "react-native";

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text>AboutScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'beige',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AboutScreen;