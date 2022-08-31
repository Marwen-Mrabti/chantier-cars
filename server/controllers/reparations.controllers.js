import { Reparation } from '../models/reparation.model.js';
import { Car } from '../models/car.model.js';

//add new reparation
export const AddNewReparation = async (req, res) => {
  try {
    const { car_id } = req.params;
    //find the car
    const car = await Car.findById(car_id);
    //create new reparation
    const newReparation = new Reparation({
      car: car_id,
      description: req.body.description,
      type: req.body.type,
      cost: req.body.cost,
      addedAt: new Date().toISOString(),
    });

    //add to reparations array
    car.reparations.push(newReparation);
    //save the new reparation and the updated car
    await newReparation.save();
    await car.save();
    res.status(201).json({ car });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//update reparation
export const UpdateReparation = async (req, res) => {
  try {
    const { car_id, reparation_id } = req.params;
    //find the car
    const car = await Car.findById(car_id);
    let carId = car._id.toString();

    if (car_id === carId) {
      //get the update index
      const updateIndex = car.reparations
        .map((rep) => rep._id.toString())
        .indexOf(reparation_id);
      console.log(updateIndex);
      console.log(car.reparations[updateIndex]);
      //update reparation in car's reparation array
      car.reparations[updateIndex] = { ...req.body };

      await car.save();

      // update reparation in the database
      // await Reparation.findByIdAndUpdate(
      //   reparation_id,
      //   { ...req.body, reparation_id },
      //   { new: true }
      // );
      res.status(201).json({ message: 'reparation updated', car });
    } else {
      res.status(404).json({ message: 'car not found' });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// delete reparation
export const DeleteReparation = async (req, res) => {
  try {
    const { car_id, reparation_id } = req.params;
    //find the car
    const car = await Car.findById(car_id);
    let carId = car._id.toString();

    if (car_id === carId) {
      //get the remove index
      const removeIndex = car.reparations
        .map((rep) => rep._id.toString())
        .indexOf(reparation_id);
      //remove reparation from reparation array
      car.reparations.splice(removeIndex, 1);
      await car.save();

      // remove reparation from the database
      await Reparation.findByIdAndRemove(reparation_id);
      res.status(201).json({ message: 'reparation deleted', car });
    } else {
      res.status(404).json({ message: 'car not found' });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
