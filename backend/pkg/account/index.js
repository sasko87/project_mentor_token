const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["mentor", "startup"],
    },
    phone: {
      type: String,
      required: function () {
        return this.type === "mentor";
      },
    },
    skills: {
      type: [String],
      required: function () {
        return this.type === "mentor";
      },
    },
    desc: {
      type: String,
      required: function () {
        return this.type === "mentor";
      },
    },
    possition: {
      type: String,
      required: function () {
        return this.type === "mentor";
      },
    },
    representative: {
      type: String,
      required: function () {
        return this.type === "startup";
      },
    },
    address: {
      type: String,
      required: function () {
        return this.type === "startup";
      },
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema, "accounts");

const createAccount = async (acc) => {
  const account = new Account(acc);
  return await account.save();
};

const getAccountByEmail = async (email) => {
  return await Account.findOne({ email });
};

const updateAccount = async (id, data) => {
  return await Account.updateOne({ _id: id }, data);
};

const removeAccount = async (id) => {
  return await Account.deleteOne({ id });
};

const allMentors = async () => {
  return await Account.find({ type: "mentor" });
};

const accountById = async (id) => {
  return await Account.findOne({ _id: id });
};

const setNewPassword = async (id, password) => {
  return await Account.updateOne({ _id: id }, { password: password });
};
module.exports = {
  createAccount,
  getAccountByEmail,
  updateAccount,
  removeAccount,
  allMentors,
  accountById,
  setNewPassword,
};
