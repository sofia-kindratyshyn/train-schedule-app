import { Router } from 'express';
import {
  //   deleteTrainController,
  //   getByIdTrainController,
  getTrainsController,
  //   patchTrainController,
  postTrainController,
  //   putTrainController,
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
// trainsRouter.get('/trains/:id', getByIdTrainController);
// trainsRouter.patch('/trains/:id', patchTrainController);
// trainsRouter.put('/trains/:id', putTrainController);
// trainsRouter.delete('/trains/:id', deleteTrainController);

export default trainsRouter;
