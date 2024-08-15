const { getFilteredApplications } = require("../pkg/application/application");
const {
  createJob,
  updateJob,
  deleteJob,
  getJob,
  getFilteredJobs,
} = require("../pkg/job/job");
const { validate, JobValidate } = require("../pkg/job/validate");

const createNewJob = async (req, res) => {
  try {
    await validate(req.body, JobValidate);
    const data = {
      ...req.body,
      companyId: req.auth.id,
    };
    const newJob = await createJob(data);
    return res.status(200).send(newJob);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const updateOneJob = async (req, res) => {
  try {
    const data = {
      ...req.body,
      companyId: req.auth.id,
    };
    const newJob = await updateJob(req.params.id, data);
    return res.status(200).send(newJob);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const deleteOneJob = async (req, res) => {
  try {
    await deleteJob(req.params.id);
    return res.status(200).send("Job was successfuly deleted");
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const getOneJob = async (req, res) => {
  try {
    const job = await getJob(req.auth.id, req.params.id);
    if (!job) {
      return res.status(404).send("Job does not exists");
    }
    return res.status(200).send(job);
  } catch (error) {
    return res.status(error.status).send(error.error);
  }
};

const getOneCompanyJobs = async (req, res) => {
  try {
    const filter = { companyId: req.auth.id };
    const jobs = await getFilteredJobs(filter);

    return res.status(200).send(jobs);
  } catch (err) {
    console.log(err);
    return res.status(err.status).send(err.error);
  }
};

const allJobs = async (req, res) => {
  try {
    const filter = {};
    const jobs = await getFilteredJobs(filter);
    return res.status(200).send(jobs);
  } catch (error) {
    return res.status(404).send("Internal Server Error");
  }
};

//filteredJobs
//da mozam da pratam id na kompanija i da mi gi dade spored id na taa kompanija

const filteredJobs = async (req, res) => {
  try {
    console.log(req);
    const jobs = await getFilteredJobs(req.query);
    return res.status(200).send(jobs);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

module.exports = {
  getOneCompanyJobs,
  createNewJob,
  updateOneJob,
  deleteOneJob,
  allJobs,
  filteredJobs,
};
