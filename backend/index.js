const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const { getSection } = require("./pkg/config");
const { login, register } = require("./handlers/auth");
const {
  createNewJob,
  getOneCompanyJobs,
  deleteOneJob,
  allJobs,
  filteredJobs,
} = require("./handlers/job.js");

require("./pkg/db/config");

const app = express();

app.use(express.json());
app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/auth/reset-password",
      "/api/alljobs",
      "/api/filteredJobs",
    ],
  })
);

app.post("/api/auth/login", login);
app.post("/api/auth/register", register);
app.post("/api/postjob", createNewJob);
app.get("/api/showjobs", getOneCompanyJobs);
app.delete("/api/deletejob/:id", deleteOneJob);
app.get("/api/alljobs", allJobs);
app.get("/api/filteredJobs", filteredJobs);

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}`)
);
