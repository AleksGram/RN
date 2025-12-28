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
