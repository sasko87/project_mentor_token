const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  applicationType: {
    type: String,
    enum: ["mentorToCompany", "companyToMentor"],
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    required: true,
  },
  acceptedStatus: {
    type: String,
    enum: ["done", "rejected", "in progress"],
  },
});

const Application = mongoose.model(
  "Application",
  applicationSchema,
  "applications"
);

const getMentors = async () => {
  return await Application.find().populate({
    path: "mentorId",
    select: "email",
  });
};
