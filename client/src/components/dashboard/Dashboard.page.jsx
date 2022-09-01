import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Radio } from 'react-loader-spinner';

//state actions
import { FetchAllCars } from '../../redux/actions/car.actions';

//bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//local components
import CarCard from './carCard/CarCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  // dispatch Fetch all cars action every time the dashboard rerender
  useEffect(() => {
    dispatch(FetchAllCars());
  }, [dispatch]);
  // extract cars and loading from the state
  const { cars, loading } = useSelector((state) => state.cars);

  // initialize state variables to filter the array of cars by price
  const [filteredCars, setFilteredCars] = useState(cars);
  const [priceFilter, setPriceFilter] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  // prepare price filter util values
  useEffect(() => {
    setMaxPrice(Math.max(...cars.map((car) => car.purchasePrice)));
    setMinPrice(Math.min(...cars.map((car) => car.purchasePrice)));
    setPriceFilter(minPrice);
  }, [cars, minPrice]);

  //filter cars by price
  useEffect(() => {
    setFilteredCars(cars.filter((car) => car.purchasePrice >= priceFilter));
  }, [cars, priceFilter]);

  return loading ? (
    <div className="container__center">
      <Radio
        visible={true}
        height="150"
        width="150"
        colors={['#b2f2bb', '#69db7c', '#37b24d']}
        ariaLabel="radio-loading"
        wrapperStyle={{}}
        wrapperClass="radio-wrapper"
      />
    </div>
  ) : !cars.length ? (
    <div className="container__center">
      <h1 style={{ color: 'orange' }}>no posts</h1>
      <Link to="/new" style={{ color: 'blue' }}>
        Create one &rarr;
      </Link>
    </div>
  ) : (
    <Container>
      <Row
        style={{ marginBottom: '3rem' }}
        className="d-flex justify-content-center align-items-center"
      >
        <Col>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step="500"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="secondary" size="lg">
            <Link style={{ color: '#f2f2f2' }} to="/new">
              add new car &rarr;
            </Link>
          </Button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        {filteredCars.map((car) => (
          <Col
            className="mx-2 mb-5"
            key={car._id}
            style={{ minWidth: '300px', maxWidth: '350px' }}
          >
            <CarCard car={car} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
