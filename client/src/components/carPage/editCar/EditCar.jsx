import React from 'react';
import Button from 'react-bootstrap/Button';

const EditCar = ({ car, setEditCar }) => {
  return (
    <div className="container__form" style={{ marginTop: '3rem' }}>
      <Button
        style={{ marginBottom: '2rem' }}
        variant="danger"
        size="md"
        onClick={() => setEditCar(false)}
      >
        aport editing the car information X
      </Button>
    </div>
  );
};

export default EditCar;
