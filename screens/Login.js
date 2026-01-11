import { useState, useContext } from "react";
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
import { loginUser } from "../auth/auth";

function Login({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);

  async function loginHandler() {
    try {
      const token = await loginUser(login, password);
      authCtx.authenticate(token, login);
      console.log("Login with:", login, password);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not login. Please try again later."
      );
      console.log("auth-error", error);
    }
  }

  function switchToSignup() {
    navigation.navigate("Signup");
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
        <Text style={styles.label}>Login</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Enter your login"
          placeholderTextColor="#999"
          value={login}
          onChangeText={setLogin}
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

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={loginHandler}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}
        onPress={switchToSignup}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </Pressable>
    </View>
  );
}

export default Login;

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
