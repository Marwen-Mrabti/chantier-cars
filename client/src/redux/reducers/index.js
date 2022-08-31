import { combineReducers } from 'redux';
import { carsReducer } from './cars.reducer';
import { repairsReducer } from './repairs.reducer';

const rootReducer = combineReducers({
  cars: carsReducer,
  repairs: repairsReducer,
});

export default rootReducer;
