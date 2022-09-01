import React from 'react';

//state actions

//bootstrap component
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <Card style={{ width: '100%', boxShadow: '0 2rem 4rem rgba(#000,0.2)' }}>
      <Card.Img variant="top" src={car.images[0]} />
      <Card.Body style={{}}>
        <Card.Title
          style={{ fontSize: '1.8rem', display: 'inline-block', margin: '1rem 0.2rem' }}
        >
          {car.brand}
        </Card.Title>
        <Card.Title
          style={{ fontSize: '1.6rem', display: 'inline-block', margin: '1rem 0rem' }}
        >
          {car.model}
        </Card.Title>
        <Card.Title
          style={{ fontSize: '1.7rem', display: 'inline-block', margin: '1rem 2rem' }}
        >
          {car.year.split('-')[0]}
        </Card.Title>
        <Button variant="success" style={{ display: 'block' }}>
          <Link to={`/car/${car._id}`} style={{ color: '#fff' }}>
            Go to car page&rarr;
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
