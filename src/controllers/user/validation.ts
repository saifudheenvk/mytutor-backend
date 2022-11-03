const Joi = require("joi");

export const registerValidation = (data: any) => {
  const userValidationSchema = Joi.object({
    password: Joi.string().max(1024).min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().min(6).max(255).email().required(),
    mobileNumber: Joi.string().required(),
  });
  return userValidationSchema.validate(data);
};

export const loginValidation = (data: any) => {
  const userValidationSchema = Joi.object({
    password: Joi.string().max(1024).min(6).required(),
    email: Joi.string().min(6).max(255).email().required(),
  });
  return userValidationSchema.validate(data);
};


export {};