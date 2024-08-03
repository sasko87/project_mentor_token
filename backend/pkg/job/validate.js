const { Validator } = require("node-input-validator");

const JobValidate = {
  companyId: "required|ObjectId",
  title: "required|string",
  description: "required|string",
  skillsRequired: "required|array",
  status: "required|in:Direct, Open",
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors,
    };
  }
};

module.exports = { JobValidate, validate };
