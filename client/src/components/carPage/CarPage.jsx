import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

//state actions
import { DeleteCar, FetchCarById } from '../../redux/actions/car.actions';

//bootstrap components
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddRepair from './addRepairs/AddRepair';
import EditCar from './editCar/EditCar';
import { DeleteRepair } from '../../redux/actions/repairs.action';
//modals

const CarPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { car_id } = useParams();
  const [profit, setProfit] = useState(0);
  const [totalRepairCost, setTotalRepairCost] = useState(0);
  const [addRepair, setAddRepair] = useState(false);
  const [editCar, setEditCar] = useState(false);

  useEffect(() => {
    dispatch(FetchCarById(car_id));
  }, [dispatch, car_id]);
  const { car } = useSelector((state) => state.cars);

  //profit calculation
  useEffect(() => {
    if (car?.reparations.length) {
      const repairCost = car.reparations
        .map((rep) => rep.cost)
        .reduce((cost, currentValue) => (cost += currentValue));
      setTotalRepairCost(repairCost);
    }
    //if the car is sold
    car?.sold && setProfit(car.sold.sellingPrice - car.purchasePrice - totalRepairCost);
  }, [car, totalRepairCost]);

  //******** call to action handlers
  //delete car
  const handleOnCarDelete = () => {
    const confirmDelete = prompt(
      'this action can not be undone!!! type delete if you are sure?',
      "don't delete"
    );
    if (confirmDelete === 'delete') {
      dispatch(DeleteCar(car_id));
      navigate('/');
    }
  };

  //delete repair
  const handleOnRepairDelete = (repair_id) => {
    dispatch(DeleteRepair(car_id, repair_id, navigate));
  };

  return (
    <Stack direction="vertical" gap={10}>
      <Link to="/" className="p-3">
        &larr; go to dashboard
      </Link>
      {/**************  if the car exists ************/}
      {car ? (
        <Stack direction="horizontal" gap={5}>
          <Carousel style={{ width: '60vw', padding: '2rem' }}>
            {car.images.length &&
              car.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img className=" w-100" src={car.images[0]} alt={car.brand} />
                </Carousel.Item>
              ))}
          </Carousel>
          <Stack
            direction="vertical"
            gap={3}
            style={{
              backgroundColor: '#f2f2f2',
              padding: '1rem 2rem',
              borderRadius: '1rem',
            }}
          >
            <h1 className="text-center">car info</h1>
            <h4>
              {car.brand} {car.model.toUpperCase()} {car.year.split('-')[0]}
            </h4>
            <h4>car_state: {car.state} </h4>
            <h4>purchase_price: {car.purchasePrice}$ </h4>
            <h4>purchase_date: {car.purchaseDate.split('T')[0]} </h4>

            {/*----------- if the car is sold ----------*/}
            {car?.sold.state && (
              <>
                <h4>the car has been sold</h4>
                <h4>selling date:{car.sold.date.split('T')[0]} </h4>
                <h4>selling price:{car.sold.sellingPrice}$ </h4>
                <h4>profit:{profit}$ </h4>
              </>
            )}

            {/*----------- if the repairs array not vide ----------*/}
            {!car?.reparations.length ? null : (
              <Stack>
                {car.reparations.map((rep) => (
                  <div
                    key={rep._id}
                    style={{
                      backgroundColor: 'grey',
                      color: 'white',
                      padding: '2rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <h5>repair_description: {rep.description} </h5>
                    <h5>repair_cost: {rep.cost}$ </h5>
                    {rep.date && <h5>repaired at {rep.date.split('T')[0]} </h5>}
                    <Stack direction="horizontal" gap={3}>
                      <Button variant="warning" size="lg" style={{ marginLeft: 'auto' }}>
                        edit repair
                      </Button>
                      <Button
                        variant="danger"
                        size="lg"
                        onClick={() => handleOnRepairDelete(rep._id)}
                      >
                        delete repair
                      </Button>
                    </Stack>
                  </div>
                ))}
              </Stack>
            )}

            <Stack direction="vertical" gap={3}>
              <Stack direction="horizontal" gap={3}>
                <Button variant="info" size="lg" onClick={() => setAddRepair(true)}>
                  add repair
                </Button>
                <Button
                  variant="warning"
                  size="lg"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setEditCar(true)}
                >
                  edit
                </Button>
              </Stack>
              <Button variant="danger" size="lg" onClick={handleOnCarDelete}>
                delete
              </Button>
            </Stack>
          </Stack>
          <Modal
            show={addRepair}
            onHide={() => setAddRepair(false)}
            fullscreen={true}
            dialogClassName="modal-100w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <AddRepair car_id={car_id} setAddRepair={setAddRepair} />
          </Modal>
          <Modal
            show={editCar}
            onHide={() => setEditCar(false)}
            fullscreen={true}
            dialogClassName="modal-100w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <EditCar car={car} setEditCar={setEditCar} />
          </Modal>
        </Stack>
      ) : (
        <h1>car does not exist</h1>
      )}
    </Stack>
  );
};

export default CarPage;
