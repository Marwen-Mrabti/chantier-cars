import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//state actions
import { FetchAllCars } from './redux/actions/car.actions';
//components

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchAllCars());
  }, []);

  return <div className="App">chantier cars</div>;
}

export default App;
