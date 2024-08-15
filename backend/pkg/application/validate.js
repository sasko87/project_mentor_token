const { Validator } = require("node-input-validator");

const ApplicationValidate = {
  companyId: "required|ObjectId",
  mentorId: "required|ObjectId",
  jobId: "required|ObjectId",
  status: "required|in: PENDING, ACCEPTED, REJECTED, CANCELED",
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

module.exports = { ApplicationValidate, validate };
