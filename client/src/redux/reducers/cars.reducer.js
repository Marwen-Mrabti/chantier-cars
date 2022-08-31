import {
  LOADING,
  ADD_NEW_CAR,
  FETCH_ALL_CARS,
  FETCH_CAR_BY_ID,
  UPDATE_CAR,
  DELETE_CAR,
} from '../actionTypes/actionTypes';

const initialState = {
  cars: [],
  car: null,
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
        cars: [...action.payload.data],
        loading: false,
      };

    case FETCH_CAR_BY_ID:
      return { ...state, car: action.payload, loading: false };

    case UPDATE_CAR:
      return {
        ...state,
        cars: state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car
        ),
      };

    case DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car._id !== action.payload),
      };

    default:
      return state;
  }
};
