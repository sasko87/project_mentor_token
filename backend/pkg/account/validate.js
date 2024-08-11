const { Validator } = require("node-input-validator");

const AccountLogin = {
  email: "required|string",
  password: "required|string",
};

const AccountRegister = {
  name: "required|string",
  email: "required|email",
  password: "required|string",
  type: "required|string|in:mentor,startup",
  phone: "required|integer",
  skills: "array",
  desc: "string",
  representative: "string",
  address: "string",
};

const ChangePasswordValidate = {
  oldPassword: "required|string",
  newPassword: "required|string",
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

module.exports = {
  AccountLogin,
  AccountRegister,
  ChangePasswordValidate,
  validate,
};
