import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
        convert: true,
      });
      next();
    } catch (err) {
      const error = createHttpError(
        400,
        'Bad request error',
        Array.isArray(err.details)
          ? err.details.map(({ message, path }) => {
              return { message, path };
            })
          : { errors: err.details },
      );
      next(error);
    }
  };
};
