import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { auth, provider } from "./firebaseConfig";

const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

        });
};

export const GoogleSignUpButton = () => {
    return (
        <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
            <Image source={require('./assets/img/google.png')} style={styles.image} />
            <Text style={styles.text}>Sign Up with Google</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    text: {
        color: '#757575',
        fontWeight: 'bold',
    },
});