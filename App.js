import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import SelectedCar from "./screens/SelectedCar";
import AddCar from "./screens/AddCar";
import Service from "./screens/Service";
import AddServiceNote from "./screens/AddServiceNote";
import Parts from "./screens/Parts";
import AddPart from "./screens/AddPart";
import Notes from "./screens/Notes";
import AddNote from "./screens/AddNote";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext } from "react";

import AllCars from "./screens/AllCars";
import { Colors } from "./constants/styles";
import Avatar from "./components/Avatar";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const Stack = createNativeStackNavigator();

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              {authCtx.isAuthenticated ? (
                <>
                  <Avatar label="A" />
                  <Pressable
                    onPress={authCtx.logout}
                    style={({ pressed }) => pressed && styles.pressed}
                  >
                    <Ionicons name="log-out-outline" size={24} color="black" />
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable
                    onPress={() => navigation.navigate("Login")}
                    style={({ pressed }) => [
                      styles.button,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => navigation.navigate("Signup")}
                    style={({ pressed }) => [
                      styles.button,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.buttonText}>Sign up</Text>
                  </Pressable>
                </>
              )}
            </View>
          ),
        })}
      >
        {!authCtx.isAuthenticated ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="AllCars"
              component={AllCars}
              options={{
                title: "Your Cars",
              }}
            />
            <Stack.Screen
              name="SelectedCar"
              component={SelectedCar}
              options={({ navigation }) => ({
                title: "Service options",
              })}
            />
            <Stack.Screen
              name="AddCar"
              component={AddCar}
              options={{
                title: "Add New Car",
              }}
            />
            <Stack.Screen
              name="Service"
              component={Service}
              options={{
                title: "Service Notes",
              }}
            />
            <Stack.Screen
              name="AddServiceNote"
              component={AddServiceNote}
              options={{
                title: "Add Service Note",
              }}
            />
            <Stack.Screen
              name="Parts"
              component={Parts}
              options={{
                title: "Car Parts",
              }}
            />
            <Stack.Screen
              name="AddPart"
              component={AddPart}
              options={{
                title: "Add New Part",
              }}
            />
            <Stack.Screen
              name="Notes"
              component={Notes}
              options={{
                title: "Car Notes",
              }}
            />
            <Stack.Screen
              name="AddNote"
              component={AddNote}
              options={{
                title: "Add New Note",
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="dark" />
      <Navigation />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginRight: 10,
    gap: 10,
    justifyContent: "space-between",
  },
  button: {
    marginHorizontal: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
});
