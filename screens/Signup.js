import { useState, useContext } from "react";
import { createUser } from "../auth/auth";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { Colors } from "../constants/styles";
import { AuthContext } from "../store/auth-context";

function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const authCtx = useContext(AuthContext);

  async function signupHandler() {
    if (password !== confirmPassword) {
      Alert.alert("Invalid input", "Passwords do not match!");
      return;
    }
    // TODO: Implement signup logic
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token, email);
      console.log("Signup with:", email, passwordn);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user. Please try again later."
      );
      console.log("auth-error", error);
    }
  }

  function switchToLogin() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logoApp.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Enter your password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Confirm your password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={signupHandler}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}
        onPress={switchToLogin}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.gray700,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 350,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.gray700,
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  button: {
    backgroundColor: Colors.primary500,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: Colors.primary500,
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});
