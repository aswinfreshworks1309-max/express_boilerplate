export const validateSchema = (schema) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      // return response with 422
      return res.json({
        error: error.details,
      });
    } else {
      //  proceed to the next controller
      next();
    }
  };
};

export const validateQueryParam = (schema) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.query);
    if (error) {
      // return response with 422
      return res.json({
        error: error.details,
      });
    } else {
      //  proceed to the next controller
      next();
    }
  };
};