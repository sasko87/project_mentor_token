const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");

const { getSection } = require("./pkg/config");
const {
  login,
  register,
  changePassword,
  forgotPassword,
  resetPassword,
  resetPassTemplate,
  registerCheckExistingAccount,
} = require("./handlers/auth");
const {
  createNewJob,
  getOneCompanyJobs,
  deleteOneJob,
  allJobs,
  filteredJobs,
  createDirectJob,
  cancelJobOffer,
  doneJob,
} = require("./handlers/job.js");

const {
  createNewApplication,
  updateOneApplication,
  deleteOneApplication,
  filteredApplications,
  acceptApplication,
  rejectApplication,
  acceptDirectApplication,
  getMentorDirectApplications,
  rejectDirectApplication,
  getApplicationsSentByMentor,
} = require("./handlers/application.js");
const {
  getAllMentors,
  getAllStartups,
  getAccoutData,
  getAccoutDataById,
  updateMentorAccount,
  getMentorStatistics,
  getStartupStatistics,
  searchMentor,
  searchStartup,
} = require("./handlers/account.js");

const { sendMessage, sendPasswordResetMail } = require("./handlers/mailer.js");

require("./pkg/db/config");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(fileUpload());
app.use(
  "/api",
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/auth/register-check-existing-account",
      "/api/send-message",
    ],
  })
);

app.post("/api/auth/login", login);
app.post("/api/auth/register", register);
app.post("/api/auth/changepassword", changePassword);
app.post(
  "/api/auth/register-check-existing-account",
  registerCheckExistingAccount
);

app.post("/api/create-new-job", createNewJob);
app.get("/api/get-one-company-jobs", getOneCompanyJobs);
app.delete("/api/delete-one-job/:id", deleteOneJob);
app.get("/api/all-jobs", allJobs);
app.get("/api/filtered-jobs", filteredJobs);
app.post("/api/create-direct-job", createDirectJob);
app.post("/api/cancel-job", cancelJobOffer);
app.post("/api/done-job", doneJob);

app.post("/api/create-new-application", createNewApplication);
app.delete("/api/delete-one-application/:id", deleteOneApplication);
app.get("/api/filtered-applications", filteredApplications);
app.post("/api/accept-application", acceptApplication);
app.post("/api/reject-application", rejectApplication);
app.get("/api/get-mentor-direct-applications", getMentorDirectApplications);
app.post("/api/accept-direct-application", acceptDirectApplication);
app.post("/api/reject-direct-application", rejectDirectApplication);
app.get("/api/get-applications-sent-by-mentor", getApplicationsSentByMentor);

app.get("/api/getallmentors", getAllMentors);
app.get("/api/get-all-startups", getAllStartups);
app.get("/api/getaccount", getAccoutData);
app.get("/api/get-account-data-by-id/:id", getAccoutDataById);
app.post("/api/send-message", sendMessage);
app.put("/api/update-mentor-account", updateMentorAccount);
app.get("/api/get-mentor-statistics", getMentorStatistics);
app.get("/api/get-startup-statistics", getStartupStatistics);
app.get("/api/search-mentor", searchMentor);
app.get("/api/search-startup", searchStartup);
app.post("/api/auth/forgot-password", forgotPassword);
app.post("/api/reset-password/:id/:token", resetPassword);
// app.get("/api/reset-password/:id/:token", resetPassTemplate);
app.post("/api/reset-pass", sendPasswordResetMail);

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}`)
);
