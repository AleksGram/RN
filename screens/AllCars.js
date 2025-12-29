import { StyleSheet, View, Text } from "react-native";
import CarTile from "../components/CarTile";
import AddCarButton from "../components/AddCarButton";
import { getCars } from "../DBConnector";
import { useEffect, useState } from "react";
import { CAR_IMAGES } from "../mockData";

function AllCars({ navigation }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      const response = await getCars();
      setCars(response);
    }
    fetchCars();
  }, []);

  if (cars.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No cars found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cars.map((car) => {
        const imageUri =
          CAR_IMAGES[car.make.toLowerCase()] || CAR_IMAGES.default;
        return (
          <CarTile
            key={car.id}
            carName={car.carName}
            carModel={car.model}
            imageUri={imageUri}
            plate={car.plate}
            onPress={() =>
              navigation.navigate("SelectedCar", {
                carName: car.carName,
                imageUri: imageUri,
                plate: car.plate,
                carId: car.id,
              })
            }
          />
        );
      })}
      <AddCarButton />
    </View>
  );
}

export default AllCars;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 35,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
});
