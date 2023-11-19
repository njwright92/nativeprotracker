import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { Button } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { GoogleSignInButton } from "../GoogleSignIn";
import { GoogleSignUpButton } from "../GoogleSignUp";

const LoginTab = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const auth = getAuth();

  const handleBack = () => {
    navigation.navigate("Landing"); // Navigate back to the Landing page
  };

  const handleLogin = async () => {
    if (!email || !password) {
      window.alert("Incorrect username or password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Main");
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Incorrect username or password");
      } else {
        setError("An error occurred during login");
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      window.alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (errorCode === "auth/user-not-found") {
        setError("User with the provided email address does not exist.");
      } else {
        setError("An error occurred while sending the password reset email.");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Main");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#F9FCF3" : "#F9FCF3",
              borderRadius: 10,
              paddingVertical: 5,
              paddingHorizontal: 5,
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 2,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="chevron-back" size={28} color="black" />
            <Text
              style={{
                color: "#D79578",
                fontWeight: "bold",
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Back to Landing
            </Text>
          </View>
        </Pressable>

        <Text style={styles.titleText}>Login</Text>
        <Image
          source={require("../assets/img/Branding.jpg")}
          style={{
            width: 240,
            height: 95,
            borderRadius: 10,
          }}
          load="lazy"
        />
        <View style={styles.formInput}>
          <Ionicons
            name="mail"
            size={24}
            color="black"
            style={styles.formIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        {error ? (
          <Text style={[styles.errorText, { color: "red" }]}>{error}</Text>
        ) : null}
        <View style={styles.formInput}>
          <Ionicons
            name="key"
            size={24}
            color="black"
            style={styles.formIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <View style={{ marginBottom: 5 }}>
          <Button
            onPress={() => handleLogin()}
            title="Login"
            icon={
              <Ionicons
                name="log-in-outline"
                size={24}
                color="white"
                style={styles.icon}
              />
            }
            buttonStyle={{
              backgroundColor: "rgb(137, 168, 234)",
              padding: 10,
              borderRadius: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
          />
        </View>
        <GoogleSignInButton />
        <View style={{ marginVertical: 5 }}>
          <Pressable
            onPress={() => handleResetPassword()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons
              name="refresh-outline"
              size={24}
              color="rgb(255, 51, 51)"
            />
            <Text style={{ color: "rgb(255, 51, 51)", marginLeft: 5 }}>
              Reset Password
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const RegisterTab = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();

  const handleRegister = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^(){}[\]:;<>,.~`_+=|\\\/-])[A-Za-z\d@$!%*?&^(){}[\]:;<>,.~`_+=|\\\/-]{7,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character. Allowed special characters are: @$!%*?&^(){}[]:;<>,.~`_+=|\\/-"
      );
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      logEvent();
      navigation.navigate("Main");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorCode === "auth/email-already-in-use") {
        setError("Email address is already in use");
      } else {
        setError("An error occurred during registration");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Register</Text>
        <Image
          source={require("../assets/img/Branding.jpg")}
          style={{
            width: 240,
            height: 100,
            borderRadius: 10,
          }}
          load="lazy"
        />
        <Text style={{ marginTop: 5, marginBottom: 5, fontWeight: "bold" }}>
          - Full About and info are on the next screen.
        </Text>
        <Text style={styles.noticeText}>Important! Registration is free!</Text>
        <View style={styles.formInput}>
          <Ionicons
            name="mail"
            size={24}
            color="black"
            style={styles.formIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        {error ? (
          <Text style={[styles.errorText, { color: "red" }]}>{error}</Text>
        ) : null}
        <View style={styles.formInput}>
          <Ionicons
            name="key"
            size={24}
            color="black"
            style={styles.formIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Button
            onPress={() => handleRegister()}
            title="Register"
            color="#5637DD"
            icon={<Ionicons name="person-add-outline" color="#fff" size={24} />}
            buttonStyle={{
              backgroundColor: "rgb(106, 163, 137)",
              padding: 10,
              borderRadius: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
          />
        </View>
        <GoogleSignUpButton />
      </View>
      {error ? (
        <Text style={[styles.errorText, { color: "red" }]}>{error}</Text>
      ) : null}
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();
const LoginScreen = () => {
  const tabBarOptions = {
    activeBackgroundColor: "rgb(137, 168, 234)",
    inactiveBackgroundColor: "rgb(106, 163, 137)",
    activeTintColor: "#fff",
    inactiveTintColor: "#fff",
    labelStyle: { fontSize: 16 },
  };

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Login"
        component={LoginTab}
        options={{
          tabBarIcon: (props) => {
            return (
              <Ionicons name="log-in-outline" size={26} color={props.color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterTab}
        options={{
          tabBarIcon: (props) => {
            return (
              <Ionicons
                name="person-add-outline"
                size={26}
                color={props.color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5BA95",
  },
  formInput: {
    flexDirection: "row",
    borderColor: "#D79578",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  formIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "#FFA500",
    marginBottom: 5,
    backgroundColor: "black",
  },
  noticeText2: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    marginBottom: 7,
  },
  text: {
    margin: 7,
    fontWeight: "bold",
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "black",
  },
  resetPasswordLink: {
    color: "red",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LoginScreen;
