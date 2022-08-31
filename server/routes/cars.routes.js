import express from 'express';
const CarsRouter = express.Router();

//load handlers
import {
  AddNewCar,
  GetAllCars,
  DeleteCar,
  UpdateCar,
  GetCarById,
} from '../controllers/cars.controllers.js';

//@route => req:post => /api/cars/new
//@desc => add new car
CarsRouter.post('/new', AddNewCar);

//@route => req:get => /api/cars/all
//@desc => fetch all cars
CarsRouter.get('/all', GetAllCars);

//@route => req:get => /api/cars/:car_id
//@desc => fetch car by id
CarsRouter.get('/:car_id', GetCarById);

//@route => req:post => /api/cars/edit/:car_id
//@desc => update car information
CarsRouter.put('/edit/:car_id', UpdateCar);

//@route => req:delete => /api/cars/delete/:car_id
//@desc => delete car
CarsRouter.delete('/delete/:car_id', DeleteCar);

//export cars router
export default CarsRouter;
