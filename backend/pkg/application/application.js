const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED", "CANCELED"],
      required: true,
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema,
  "applications"
);

const createApplication = async (data) => {
  const application = new Application(data);
  return await application.save();
};

const updateApplication = async (id, data) => {
  return await Application.updateOne({ _id: id }, data);
};

const deleteApplication = async (id) => {
  return Application.deleteOne({ _id: id });
};

const getApplication = async (id) => {
  return Application.findOne({ _id: id });
};

const getFilteredApplications = async (filters) => {
  return await Application.find(filters).populate("mentorId");
};

module.exports = {
  createApplication,
  updateApplication,
  deleteApplication,
  getApplication,
  getFilteredApplications,
};
