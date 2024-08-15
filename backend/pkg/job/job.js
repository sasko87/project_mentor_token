const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: false,
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: [String],
      required: true,
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "REVIEW", "DONE", "REJECTED", "CANCELED"],
      required: true,
    },

    applicationType: {
      type: String,
      enum: ["OPEN_FOR_ALL", "DIRECT"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema, "jobs");

const createJob = async (data) => {
  const job = new Job(data);
  return await job.save();
};

const updateJob = async (id, data) => {
  return await Job.updateOne({ _id: id }, data);
};

const deleteJob = async (id) => {
  return Job.deleteOne({ _id: id });
};

const getJob = async (id) => {
  return Job.findOne({ _id: id });
};

const getFilteredJobs = async (filters) => {
  return await Job.find(filters).populate("companyId").populate("mentorId");
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJob,
  getFilteredJobs,
};
