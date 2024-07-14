const { Validator } = require("node-input-validator");

const AccountLogin = {
  email: "required|string",
  password: "required|string",
};

const AccountRegister = {
  email: "required|string",
  password: "required|string",
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

module.exports = { AccountLogin, AccountRegister, validate };
