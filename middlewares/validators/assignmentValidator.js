const Joi = require('@hapi/joi');

// validation schema
const assignmentValidation = (data) => {
  const schema = Joi.object({
    deadline: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports = {
  assignmentValidation
};
