import {
  LOADING,
  ADD_NEW_CAR,
  FETCH_ALL_CARS,
  UPDATE_CAR,
  DELETE_CAR,
} from '../actionTypes/actionTypes';

const initialState = {
  cars: [],
  loading: false,
};

export const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case ADD_NEW_CAR:
      return { ...state, cars: [...state.cars, action.payload] };
    case FETCH_ALL_CARS:
      return {
        ...state,
        cars: action.payload.data,
        loading: false,
      };
    default:
      return state;
  }
};
