import { Car } from '../models/car.model.js';
import { Reparation } from '../models/reparation.model.js';

//add new car
export const AddNewCar = async (req, res) => {
  try {
    const car = req.body;
    const newCar = new Car({
      ...car,
      addedAt: new Date().toISOString(),
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//get all cars
export const GetAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ _id: -1 });
    res.status(200).json(cars);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get car by id
export const GetCarById = async (req, res) => {
  const { car_id } = req.params;
  try {
    const car = await Car.findById(car_id);
    res.status(200).json(car);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// edit car
export const UpdateCar = async (req, res) => {
  try {
    const { car_id } = req.params;
    const car = req.body;
    const updatedCar = await Car.findByIdAndUpdate(
      car_id,
      { ...car, car_id },
      { new: true }
    );
    res.status(201).json(updatedCar);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//delete car
export const DeleteCar = async (req, res) => {
  try {
    const { car_id } = req.params;
    await Car.findByIdAndRemove(car_id);
    //remove reparation related to this car from the reparation document
    await Reparation.deleteMany({ car: car_id });
    res.status(201).json({ message: 'car deleted' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
