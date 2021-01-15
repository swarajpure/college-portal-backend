const Joi = require('@hapi/joi');

// validation schema
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required()
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

module.exports = {
  loginValidation,
  registerValidation
};
