import { GoogleLogin } from 'react-google-login';

export const handleGoogleSignIn = (response) => {
    // Handle the Google Sign-In response
    console.log(response);
};

const GoogleSignInButton = () => {
    return (
        <GoogleLogin
            clientId="366870860977-cs1vthp1k3pftkmtn7ttu84u9htmva62.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={handleGoogleSignIn}
            onFailure={handleGoogleSignIn}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleSignInButton;
