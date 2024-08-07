const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
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
  acceptedJobs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Job",
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
  jobsPosted: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Job",
    required: function () {
      return this.type === "startup";
    },
  },
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
