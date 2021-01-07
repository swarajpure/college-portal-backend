const Joi = require('@hapi/joi');

// validation schema
const postValidation = (data) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    content: Joi.string().min(10).required()
  });
  return schema.validate(data);
};

module.exports = {
  postValidation
};
