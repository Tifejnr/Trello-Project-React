const Joi = require("joi");

function validateSignInParams(reqBody) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(250).required().email(),
    extensionKey: Joi.string().min(6).max(350).required(),
  });

  return schema.validate(reqBody);
}

exports.validateSignInParams = validateSignInParams;
