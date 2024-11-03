const Joi = require("joi");

let shopperValidation = (req, res, next) => {
  const shopperValidation = Joi.object({
    shopperName: Joi.string().required(),
    shopperNo: Joi.string().required(),
    shopperPrice: Joi.number().required(), // Ensure this matches your schema
    suits: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          color: Joi.string().required(),
          suitNo: Joi.string().required(),
        })
      )
      .min(1)
      .required(),
  });

  const { error } = shopperValidation.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Invalid request",
      errors: error.details.map((detail) => detail.message),
    });
  }

  next();
};

module.exports = { shopperValidation };
