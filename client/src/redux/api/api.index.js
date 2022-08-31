import axios from 'axios';
//url
const apiUrl = 'http://localhost:5000';

//create axios api
const API = axios.create({ baseURL: apiUrl });

/******* api request handlers *******/
//add new car
export const addNewCar = (newCar) => API.post(`/api/cars/new`, newCar);

// fetch all cars from db
export const fetchAllCars = () => API.get(`/api/cars/all`);

//update a car
export const updateCar = (car_id, updatedCar) =>
  API.put(`/api/cars/edit/${car_id}`, updatedCar);

//delete a car
export const deleteCar = (car_id) => API.delete(`/api/cars/delete/${car_id}`);
