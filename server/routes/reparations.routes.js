import express from 'express';
const ReparationRouter = express.Router();

//load handlers
import {
  AddNewReparation,
  DeleteReparation,
  UpdateReparation,
} from '../controllers/reparations.controllers.js';

//@route => req:post => /api/reparations/new
//@desc => add new reparation
ReparationRouter.post('/new_reparation/:car_id', AddNewReparation);

//@route => req:post => /api/reparations/edit/:reparation_id
//@desc => edit reparation
ReparationRouter.put('/edit_reparation/:car_id/:reparation_id', UpdateReparation);

//@route => req:post => /api/reparations/delete/:reparation_id
//@desc => delete reparation
ReparationRouter.delete('/delete_reparation/:car_id/:reparation_id', DeleteReparation);

//export cars router
export default ReparationRouter;
