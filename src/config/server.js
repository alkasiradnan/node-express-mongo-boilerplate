const dotenv = require("dotenv");
const joi = require("joi");
const path = require("path");

// const Joi = require('joi')
dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("production", "development", "test")
      .required(),
    PORT: joi.number().positive().required(),
    API_SECRET: joi.string().required().description("My api secret"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const config = {
  server: {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    apiSecret: envVars.API_SECRET,
  },
};

module.exports = config;
