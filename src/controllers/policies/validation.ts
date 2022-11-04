const Joi = require("joi");


export const updateValidation = (data: any) => {
  const validationSchema = Joi.object({
    name: Joi.string().max(1024).min(6).required(),
    _id: Joi.string().required(),
    attachedPolicies: Joi.array().items(Joi.string())
  });
  return validationSchema.validate(data);
};


export {};