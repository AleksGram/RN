import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import SelectedCar from "./screens/SelectedCar";
import AddCar from "./screens/AddCar";

import AllCars from "./screens/AllCars";
import { Colors } from "./constants/styles";
import Avatar from "./components/Avatar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
            headerRight: () => (
              // TODO: if not logged in, show login button
              <View style={styles.headerRightContainer}>
                <Avatar label="A" />
              </View>
            ),
          }}
        >
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
    marginRight: 10,
  },
});
