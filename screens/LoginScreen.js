import { StyleSheet, View, Text, Button, Alert } from "react-native";

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ProTracker</Text>
            <Button
                title="Login"
                onPress={() => Alert.alert('Login Button pressed')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'olive',
        alignItems: 'center',
        justifyContent: 'center',

    },
});

export default LoginScreen;