import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ReparationSchema = new Schema({
  car: {
    type: Schema.Types.ObjectId,
    ref: 'cars',
  },
  description: { type: String },
  type: { type: String },
  cost: { type: Number },
});

export const Reparation = mongoose.model('reparations', ReparationSchema);
