import Joi from 'joi';

export const postTrainValidation = Joi.object({
  id: Joi.number(),
  name: Joi.string().required().min(3).max(50),
  departure_station: Joi.string().min(2).max(100).required(),
  arrival_station: Joi.string().min(2).max(100).required(),
  departure_time: Joi.date().required(),
  arrival_time: Joi.date().required(),
});

export const putTrainValidation = Joi.object({
  name: Joi.string().required().min(3).max(50),
  departure_station: Joi.string().min(2).max(100).required(),
  arrival_station: Joi.string().min(2).max(100).required(),
  departure_time: Joi.date().required(),
  arrival_time: Joi.date().required(),
});
