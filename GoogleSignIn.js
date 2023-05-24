import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const handleGoogleSignIn = async () => {
    const navigation = useNavigation();

    try {
        await GoogleSignin.hasPlayServices();
        const { user } = await GoogleSignin.signIn();
        console.log(user); // Do something with the user info, such as storing it in state or passing it to another component/function
        navigation.navigate('Main');
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // Handle sign-in cancellation
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // Handle sign-in already in progress
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // Handle Play Services not available or outdated
        } else {
            // Handle other errors
        }
    }
};

export const MobileGoogleSignInButton = () => {
    return (
        <Button onPress={handleGoogleSignIn} title="Sign In with Google (Mobile)" />
    );
};


