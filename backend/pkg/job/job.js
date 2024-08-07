const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
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
    enum: ["Direct", "Open"],
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema, "jobs");

const createJob = async (data) => {
  const job = new Job(data);
  return await job.save();
};

const getOneJob = async (companyId, id) => {
  return await Job.findOne({ _id: id, companyId });
};

const getAllJobs = async (companyId) => {
  return await Job.find({ companyId });
};

const getFilteredJobs = async (filters) => {
  return await Job.find(filters);
};

const getAllCompaniesJobs = async () => {
  return await Job.find();
};

const updateJob = async (id, data) => {
  return await Job.updateOne({ _id: id }, data);
};

const deleteJob = async (id) => {
  return Job.deleteOne({ _id: id });
};

module.exports = {
  createJob,
  getOneJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getAllCompaniesJobs,
  getFilteredJobs,
};
