import { pool } from '../config/db.js';

export const getTrains = async () => {
  const trainsList = await pool.query('SELECT * FROM trains');
  return trainsList.rows;
};
export const postTrain = async (payload) => {
  const createdTrain = await pool.query(
    `INSERT INTO trains (name, departure_station, arrival_station, departure_time, arrival_time) VALUES (${payload.name},${payload.departure_station},${payload.arrival_station},${payload.departure_time},${payload.arrival_time})`,
  );
  return createdTrain;
};

export const getByIdTrain = async () => {};
export const patchTrain = async () => {};
export const putTrain = async () => {};

export const deleteTrain = async () => {};
