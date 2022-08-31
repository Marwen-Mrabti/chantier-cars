import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//use reparation schema as child schema to the car
import { ReparationSchema } from './reparation.model.js';

//create car schema
const CarSchema = new Schema({
  brand: { type: String },
  model: { type: String },
  year: { type: String },
  state: { type: String },
  purchasePrice: { type: Number },
  purchaseDate: { type: Date, default: Date.now },
  images: { type: [String], default: [] },
  sold: {
    state: { type: Boolean },
    date: { type: Date, default: Date.now },
    sellingPrice: { type: Number },
    profit: { type: Number },
  },
  reparations: { type: [ReparationSchema], default: [] },
});

// export car model
export const Car = mongoose.model('cars', CarSchema);
