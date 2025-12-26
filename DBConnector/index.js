import axios from "axios";

const DB_URL = "https://servicenotes-d6c71-default-rtdb.firebaseio.com";

export async function getCars() {
  const response = await axios.get(`${DB_URL}/cars.json`);

  const cars = [];

  for (const key in response.data) {
    const carData = {
      id: key,
      make: response.data[key].make,
      model: response.data[key].model,
      carName: response.data[key].carName,
      plate: response.data[key].plate,
    };
    cars.push(carData);
  }
  return cars;
}

export async function addCar(car) {
  const response = await axios.post(`${DB_URL}/cars.json`, car);
  const id = response.data.name;
  return id;
}
