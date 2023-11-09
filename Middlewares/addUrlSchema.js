const Joi = require("@hapi/joi");
const path = require("path");

const validSchema = async (req, res, next) => {
  if (!req.body.OriginalUrl) {
    return next(new Error("please add URL to create shorten url"));
  }
  const hostname = new URL(req.body.OriginalUrl).hostname;
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "please enter email",
      "string.email": "please enter valid email",
      "any.required": "email cant be empty",
    }),
    OriginalUrl: Joi.string()
      .uri()
      .required()
      .messages({
        "string.uri": "enter valid url",
        "string.empty": "enter url to save",
        "any.required": "add url",
      }),
  });
  const result = schema.validate({email:req.body.email,OriginalUrl:req.body.OriginalUrl}, { abortEarly: false });
  if (result.error) {
    console.log(result.error);
    return next(new Error(result.error));
  }
  next()
};
module.exports = { validSchema };
