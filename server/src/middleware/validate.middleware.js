const ApiError = require('../utils/ApiError.js');

const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const formattedErrors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      return next(new ApiError(400, 'Validation failed', formattedErrors));
    }

    req[source] = result.data;
    next();
  };
};

module.exports = validate;
