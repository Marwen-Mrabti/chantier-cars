import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//state actions
import { FetchAllCars } from '../../redux/actions/car.actions';
import CarCard from './carCard/CarCard';

//local components

const Dashboard = () => {
  const dispatch = useDispatch();

  // dispatch Fetch all cars action every time the dashboard rerender
  useEffect(() => {
    dispatch(FetchAllCars());
  }, [dispatch]);

  // extract cars and loading from the state
  const { cars, loading } = useSelector((state) => state.cars);

  return loading ? (
    <div className="container__center">
      <h1>loading</h1>
    </div>
  ) : !cars.length ? (
    <div className="container__center">
      <h1 style={{ color: 'orange' }}>no posts</h1>
      <Link to="/new" style={{ color: 'blue' }}>
        Create one &rarr;
      </Link>
    </div>
  ) : (
    <div className="container__start-center">
      <Link to="/new">add new car &rarr;</Link>
      <div className="container__cars">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
