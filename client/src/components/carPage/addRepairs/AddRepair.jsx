import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//state actions
import { AddNewRepair } from '../../../redux/actions/repairs.action';

//bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// default repair state
const defaultRepair = {
  description: '',
  date: '',
  type: '',
  cost: 0,
};

const AddRepair = ({ car_id, setAddRepair }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [repair, setRepair] = useState(defaultRepair);

  //handlers
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(AddNewRepair(car_id, repair, navigate));
    setRepair(defaultRepair);
    setAddRepair(false);
  };

  return (
    <div className="container__form" style={{ marginTop: '3rem' }}>
      <Button
        style={{ marginBottom: '2rem' }}
        variant="danger"
        size="md"
        onClick={() => setAddRepair(false)}
      >
        aport adding a repair X
      </Button>
      <Form className="form" onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="repairDescription">
          <Form.Label style={{ fontSize: '1.2rem' }}>repair description</Form.Label>
          <Form.Control
            className="p-md-3"
            type="text"
            as="textarea"
            placeholder="Enter the repair description"
            value={repair.description}
            onChange={(e) => setRepair({ ...repair, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="repairType">
          <Form.Label style={{ fontSize: '1.2rem' }}>choose the repair type</Form.Label>
          <DropdownButton
            variant="info"
            size="lg"
            title={`the car needs  ${repair.type} repair`}
            onSelect={(optionValue) => setRepair({ ...repair, type: optionValue })}
          >
            <Dropdown.Item eventKey=" mechanical"> mechanical</Dropdown.Item>
            <Dropdown.Item eventKey="electrical">electrical</Dropdown.Item>
            <Dropdown.Item eventKey="combined">combined</Dropdown.Item>
          </DropdownButton>
        </Form.Group>

        <Form.Group className="mb-3" controlId="repairCost">
          <Form.Label style={{ fontSize: '1.2rem' }}>repair cost</Form.Label>
          <Form.Control
            className="p-md-3"
            type="number"
            placeholder="Enter repair cost"
            value={repair.cost}
            onChange={(e) => setRepair({ ...repair, cost: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="repairDate">
          <Form.Label style={{ fontSize: '1.2rem' }}>repair date</Form.Label>
          <Form.Control
            className="p-md-3"
            type="date"
            placeholder="Enter repair date"
            value={repair.date}
            onChange={(e) => setRepair({ ...repair, date: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" size="lg" style={{ width: '100%' }} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddRepair;
