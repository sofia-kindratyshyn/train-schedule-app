import {
  deleteTrain,
  getByIdTrain,
  getTrains,
  patchTrain,
  postTrain,
  putTrain,
} from '../service/trains.js';

export const getTrainsController = async (req, res) => {
  const trains = await getTrains();
  res.json({
    message: 'Successfuly got trains',
    status: 200,
    data: trains,
  });
};

export const postTrainController = async (req, res) => {
  const createdTrain = await postTrain(req.body);
  return res.json({
    message: 'Successfuly created train',
    status: 201,
    data: createdTrain,
  });
};

export const getByIdTrainController = async (req, res) => {
  const { trainId } = req.params;
  const train = await getByIdTrain(Number(trainId));

  if (!train) {
    return res.status(404).json({
      message: `Train with id ${trainId} not found`,
      status: 404,
    });
  }

  return res.json({
    message: `Successfuly got train with id ${trainId}`,
    status: 200,
    data: train,
  });
};

export const patchTrainController = async (req, res) => {
  return await patchTrain();
};

export const putTrainController = async (req, res) => {
  const updatedTrain = await putTrain(req.body, req.params.trainId);
  return res.json({
    message: `Successfuly updated train with id ${req.params.trainId}`,
    status: 200,
    data: updatedTrain.rows[0],
  });
};

export const deleteTrainController = async (req, res) => {
  const { trainId } = req.params;
  await deleteTrain(trainId);
  return res.json({
    message: `Successfuly deleted train with id ${req.query.trainId}`,
    status: 200,
  });
};
