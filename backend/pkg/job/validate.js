const { Validator } = require("node-input-validator");

const JobValidate = {
  companyId: "required|ObjectId",
  title: "required|string",
  description: "required|string",
  skillsRequired: "required|array",
  status: "required|in: OPEN, IN_PROGRESS, REVIEW, DONE, REJECTED, CANCELED",
  applicationType: "required|in: OPEN_FOR_ALL, DIRECT",
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
