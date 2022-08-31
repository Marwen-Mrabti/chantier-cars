//import all api handlers
import * as api from '../api/api.index.js';
// import actionTypes
import {
  LOADING,
  ADD_NEW_CAR,
  FETCH_ALL_CARS,
  FETCH_CAR_BY_ID,
  UPDATE_CAR,
  DELETE_CAR,
} from '../actionTypes/actionTypes';

// add new car
export const AddNewCar = (newCar) => async (dispatch) => {
  try {
    const { data } = await api.addNewCar(newCar);
    dispatch({ type: ADD_NEW_CAR, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//fetch all cars
export const FetchAllCars = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const data = await api.fetchAllCars();

    dispatch({ type: FETCH_ALL_CARS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//fetch car by id
export const FetchCarById = (car_id) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await api.fetchCarById(car_id);
    dispatch({ type: FETCH_CAR_BY_ID, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//update car
export const UpdateCar = (car_id, updatedCar) => async (dispatch) => {
  try {
    const { data } = await api.updateCar(car_id, updatedCar);
    dispatch({ type: UPDATE_CAR, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//delete car
export const DeletePost = (car_id) => async (dispatch) => {
  try {
    await api.deleteCar(car_id);
    dispatch({ type: DELETE_CAR, payload: car_id });
  } catch (error) {
    console.log(error);
  }
};
