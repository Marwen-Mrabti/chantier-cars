// load node modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// load .env variables
dotenv.config();

//load routes
import CarsRouter from './routes/cars.routes.js';
import ReparationRouter from './routes/reparations.routes.js';

//create express instance
const app = express();

/*********middleware*********/
// Cross-Origin Resource Sharing==>Enable All CORS Requests
app.use(cors());

//data parser
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());

//use routes
app.use('/api/cars', CarsRouter);
app.use('/api/reparations', ReparationRouter);

//connect to db then run server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

//DB config
const ConnectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  } catch (error) {
    console.error('connection to db failed', error.message);
  }
};

ConnectDB();
mongoose.connection.on('open', () => console.log('db connected'));
mongoose.connection.on('error', (err) => console.log(err.message));
