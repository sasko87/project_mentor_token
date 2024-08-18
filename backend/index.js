const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const { getSection } = require("./pkg/config");
const {
  login,
  register,
  changePassword,
  forgotPassword,
  resetPassword,
  // resetPassTemplate,
} = require("./handlers/auth");
const {
  createNewJob,
  getOneCompanyJobs,
  deleteOneJob,
  allJobs,
  filteredJobs,
} = require("./handlers/job.js");

const {
  createNewApplication,
  updateOneApplication,
  deleteOneApplication,
  filteredApplications,
  acceptApplication,
  rejectApplication,
} = require("./handlers/application.js");
const {
  getAllMentors,
  getAccoutData,
  getAccoutDataById,
} = require("./handlers/account.js");
const { sendMessage } = require("./handlers/mailer.js");

require("./pkg/db/config");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  "/api",
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgotpassword",
      "/api/auth/reset-password",
      "/api/get-account-data-by-id/:id",
    ],
  })
);

app.post("/api/auth/login", login);
app.post("/api/auth/register", register);
app.post("/api/auth/changepassword", changePassword);

app.post("/api/create-new-job", createNewJob);
app.get("/api/get-one-company-jobs", getOneCompanyJobs);
app.delete("/api/delete-one-job/:id", deleteOneJob);
app.get("/api/all-jobs", allJobs);
app.get("/api/filtered-jobs", filteredJobs);

app.post("/api/create-new-application", createNewApplication);
app.delete("/api/delete-one-application/:id", deleteOneApplication);
app.get("/api/filtered-applications", filteredApplications);
app.post("/api/accept-application", acceptApplication);
app.post("/api/reject-application", rejectApplication);

app.get("/api/getallmentors", getAllMentors);
app.get("/api/getaccount", getAccoutData);
app.get("/api/get-account-data-by-id/:id", getAccoutDataById);
app.post("/api/sendmessage", sendMessage);

app.post("/api/auth/forgot-password", forgotPassword);
app.post("/reset-password/:id/:token", resetPassword);
// app.get("/reset-password/:id/:token", resetPassTemplate);
// app.post("/api/reset-pass", sendPasswordResetMail);

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}`)
);
