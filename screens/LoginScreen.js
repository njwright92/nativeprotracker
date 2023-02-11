import { StyleSheet, View, Text } from "react-native";


const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ProTracker</Text>
            <Text>LoginScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default LoginScreen;