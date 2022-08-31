import { LOADING } from '../actionTypes/actionTypes';

const initialState = {
  repairs: [],
  loading: false,
};

export const repairsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};
