const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  email: String,
  password: String,
});

const Account = mongoose.model("Account", accountSchema, "accounts");

const createAccount = async (acc) => {
  const account = new Account(acc);
  return await account.save();
};

const getAccountByEmail = async (email) => {
  return await Account.findOne({ email });
};

const updateAccount = async (id, account) => {
  return await Account.updateOne({ _id: id }, account);
};

const removeAccount = async (id) => {
  return await Account.deleteOne({ id });
};

module.exports = {
  createAccount,
  getAccountByEmail,
  updateAccount,
  removeAccount,
};
