//import all api handlers
import * as api from '../api/api.index.js';
// import actionTypes
import { UPDATE_CAR } from '../actionTypes/actionTypes';

// add new repair
export const AddNewRepair = (car_id, newRepair, navigate) => async (dispatch) => {
  try {
    const car = await api.addNewRepair(car_id, newRepair);
    dispatch({ type: UPDATE_CAR, payload: car });
    window.location.href = `/car/${car_id}`;
  } catch (error) {
    console.log(error.message);
  }
};

//delete repair
export const DeleteRepair = (car_id, rep_id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.deleteRepair(car_id, rep_id);
    dispatch({ type: UPDATE_CAR, payload: data });
    window.location.href = `/car/${car_id}`;
  } catch (error) {
    console.log(error);
  }
};

//edit repair .....
