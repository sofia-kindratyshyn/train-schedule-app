import { pool } from '../config/db.js';

export const getTrains = async () => {
  const trainsList = await pool.query('SELECT * FROM trains');
  return trainsList.rows;
};
export const postTrain = async (payload) => {
  const createdTrain = await pool.query(
    `INSERT INTO trains
      (name, departure_station, arrival_station, departure_time, arrival_time)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      payload.name,
      payload.departure_station,
      payload.arrival_station,
      payload.departure_time,
      payload.arrival_time,
    ],
  );
  return createdTrain.rows[0];
};

export const getByIdTrain = async (trainId) => {
  const result = await pool.query('SELECT * FROM trains WHERE id = $1', [
    trainId,
  ]);
  return result.rows[0];
};

export const patchTrain = async () => {};
export const putTrain = async (payload, trainId) => {
  const updatedTrain = await pool.query(
    `UPDATE trains
     SET name=$1, departure_station=$2, arrival_station=$3, departure_time=$4, arrival_time=$5
     WHERE id=$6
     RETURNING *`,
    [
      payload.name,
      payload.departure_station,
      payload.arrival_station,
      payload.departure_time,
      payload.arrival_time,
      trainId,
    ],
  );
  return updatedTrain;
};

export const deleteTrain = async (trainId) => {
  const deletedTrain = await pool.query('DELETE FROM trains WHERE id = $1', [
    trainId,
  ]);
  return deletedTrain;
};
