import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

//state actions
import { AddNewCar } from '../../redux/actions/car.actions';

//bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FileBase from 'react-file-base64';

// default car state
const defaultCar = {
  brand: '',
  model: '',
  year: '',
  state: '',
  purchasePrice: 0,
  purchaseDate: '',
  images: [],
  sold: {
    state: false,
    date: '',
    sellingPrice: 0,
    profit: 0,
  },
};

const AddCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [car, setCar] = useState(defaultCar);

  //handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(AddNewCar(car));
    setCar(defaultCar);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <div className="container__form">
      <Link to="/" className="p-3">
        &larr; go to dashboard
      </Link>
      <Form className="form" onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="carBrand">
          <Form.Label style={{ fontSize: '1.2rem' }}>car brand</Form.Label>
          <Form.Control
            className="p-md-3"
            type="text"
            placeholder="Enter car brand"
            value={car.brand}
            onChange={(e) => setCar({ ...car, brand: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="carModel">
          <Form.Label style={{ fontSize: '1.2rem' }}>car model</Form.Label>
          <Form.Control
            className="p-md-3"
            type="text"
            placeholder="Enter car model"
            value={car.model}
            onChange={(e) => setCar({ ...car, model: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="carYear">
          <Form.Label style={{ fontSize: '1.2rem' }}>year of production</Form.Label>
          <Form.Control
            className="p-md-3"
            type="date"
            placeholder="Enter year of car's production"
            value={car.year}
            onChange={(e) => setCar({ ...car, year: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="carState">
          <Form.Label style={{ fontSize: '1.2rem' }}>choose the car state</Form.Label>
          <DropdownButton
            variant="info"
            size="lg"
            title={`the car is in ${car.state}`}
            onSelect={(optionValue) => setCar({ ...car, state: optionValue })}
          >
            <Dropdown.Item eventKey=" good state"> good state</Dropdown.Item>
            <Dropdown.Item eventKey="need minimum repair">
              need for minimum repair
            </Dropdown.Item>
            <Dropdown.Item eventKey="need a lot of repair">
              need for lot of repair
            </Dropdown.Item>
          </DropdownButton>
        </Form.Group>

        <Form.Group className="mb-3" controlId="carPurchasePrice">
          <Form.Label style={{ fontSize: '1.2rem' }}>car purchase price</Form.Label>
          <Form.Control
            className="p-md-3"
            type="number"
            placeholder="Enter car purchase price"
            value={car.purchasePrice}
            onChange={(e) => setCar({ ...car, purchasePrice: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="carPurchaseDate">
          <Form.Label style={{ fontSize: '1.2rem' }}>car purchase date</Form.Label>
          <Form.Control
            className="p-md-3"
            type="date"
            placeholder="Enter car purchase date"
            value={car.purchaseDate}
            onChange={(e) => setCar({ ...car, purchaseDate: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="carImages">
          <FileBase
            type="file"
            multiple={true}
            onDone={(files) =>
              setCar({
                ...car,
                images: [...car.images, ...files.map((img) => img.base64)],
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="isCarSold">
          <Form.Check
            type="checkbox"
            label="check this if the car is sold"
            value={car.sold.state}
            onChange={(e) =>
              setCar({ ...car, sold: { ...car.sold, state: !car.sold.state } })
            }
          />
        </Form.Group>
        {car.sold.state && (
          <>
            <Form.Group className="mb-3" controlId="sellingDate">
              <Form.Label size="sm" style={{ fontSize: '1.2rem' }}>
                selling date
              </Form.Label>
              <Form.Control
                className="p-md-3"
                type="date"
                placeholder="when did you sell this car"
                value={car.sold.date}
                onChange={(e) =>
                  setCar({ ...car, sold: { ...car.sold, date: e.target.value } })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="carSellingPrice">
              <Form.Label style={{ fontSize: '1.2rem' }}>car selling price</Form.Label>
              <Form.Control
                className="p-md-3"
                type="number"
                placeholder="Enter car selling price"
                value={car.sellingPrice}
                onChange={(e) =>
                  setCar({ ...car, sold: { ...car.sold, sellingPrice: e.target.value } })
                }
              />
            </Form.Group>
          </>
        )}

        <Button variant="primary" size="lg" style={{ width: '100%' }} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddCar;
