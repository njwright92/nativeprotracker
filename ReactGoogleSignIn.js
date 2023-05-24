import { GoogleLogin } from 'react-google-login';
import { useNavigation } from '@react-navigation/native';

export const handleGoogleSignIn = (response, navigation) => {

    navigation.navigate('Main');

    console.log(response);
};

const GoogleSignInButton = () => {
    const navigation = useNavigation();

    const onSuccess = (response) => {
        handleGoogleSignIn(response, navigation);
    };

    const onFailure = (response) => {
        handleGoogleSignIn(response, navigation);
    };

    return (
        <GoogleLogin
            clientId="366870860977-cs1vthp1k3pftkmtn7ttu84u9htmva62.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleSignInButton;
