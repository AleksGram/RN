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

export async function getServiceNotes(carId) {
  try {
    const response = await axios.get(
      `${DB_URL}/cars/${carId}/serviceNotes.json`
    );

    const categorizedNotes = {};

    if (!response.data) {
      return categorizedNotes;
    }

    // response.data is: { oil: { id1: { ... }, id2: { ... } }, filter: { id3: { ... } } }
    for (const typeKey in response.data) {
      const categoryNotes = response.data[typeKey];
      categorizedNotes[typeKey] = [];

      for (const noteId in categoryNotes) {
        categorizedNotes[typeKey].push({
          id: noteId,
          ...categoryNotes[noteId],
        });
      }

      // Sort each category by mileage descending
      categorizedNotes[typeKey].sort(
        (a, b) => Number(b.mileage) - Number(a.mileage)
      );
    }

    return categorizedNotes;
  } catch (error) {
    console.log("Error getting service notes", error);
    return {};
  }
}

export async function addServiceNote(carId, serviceNote) {
  const serviceType = serviceNote.type;

  const response = await axios.post(
    `${DB_URL}/cars/${carId}/serviceNotes/${serviceType}.json`,
    serviceNote
  );
  const id = response.data.name;
  return id;
}

export async function addPart(carId, part) {
  const response = await axios.post(`${DB_URL}/cars/${carId}/parts.json`, part);
  const id = response.data.name;
  return id;
}

export async function getParts(carId) {
  const response = await axios.get(`${DB_URL}/cars/${carId}/parts.json`);
  const parts = [];
  for (const key in response.data) {
    const partData = {
      id: key,
      ...response.data[key],
    };
    parts.push(partData);
  }
  return parts;
}

export async function addNote(carId, note) {
  const response = await axios.post(`${DB_URL}/cars/${carId}/notes.json`, note);
  const id = response.data.name;
  return id;
}

export async function getNotes(carId) {
  const response = await axios.get(`${DB_URL}/cars/${carId}/notes.json`);
  const notes = [];
  for (const key in response.data) {
    const noteData = {
      id: key,
      ...response.data[key],
    };
    notes.push(noteData);
  }
  return notes;
}

export async function updateNote(carId, noteId, note) {
  const response = await axios.patch(
    `${DB_URL}/cars/${carId}/notes/${noteId}.json`,
    note
  );
  return response.data;
}
