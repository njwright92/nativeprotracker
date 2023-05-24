import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { auth, provider } from "./firebaseConfig";

const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};

export const GoogleSignInButton = () => {
    return (
        <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
            <Image source={require('./assets/img/google.png')} style={styles.image} />
            <Text style={styles.text}>Sign In with Google</Text>
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