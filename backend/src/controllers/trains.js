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
  res.json({
    message: 'Successfuly created train',
    status: 201,
    data: createdTrain,
  });
};

export const getByIdTrainController = async (req, res) => {
  return await getByIdTrain();
};

export const patchTrainController = async (req, res) => {
  return await patchTrain();
};

export const putTrainController = async (req, res) => {
  return await putTrain();
};

export const deleteTrainController = async (req, res) => {
  return await deleteTrain();
};
