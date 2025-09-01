import { Router } from 'express';
import {
  deleteTrainController,
  getByIdTrainController,
  getTrainsController,
  //   patchTrainController,
  postTrainController,
  putTrainController,
} from '../controllers/trains.js';
//import { validateBody } from '../middleware/validateBody.js';
//import { postTrainValidation } from '../validation/trainsOperationsValidation.js';

const trainsRouter = Router();

trainsRouter.get('/trains', getTrainsController);
trainsRouter.post(
  '/trains',
  //validateBody(postTrainValidation),
  postTrainController,
);
trainsRouter.get('/trains/:trainId', getByIdTrainController);
// trainsRouter.patch('/trains/:id', patchTrainController);
trainsRouter.put('/trains/:trainId', putTrainController);
trainsRouter.delete('/trains/:trainId', deleteTrainController);

export default trainsRouter;
