const {
  createJob,
  getOneJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getAllCompaniesJobs,
  getFilteredJobs,
} = require("../pkg/job/job");
const { validate, JobValidate } = require("../pkg/job/validate");

const getOneCompanyJobs = async (req, res) => {
  try {
    const jobs = await getAllJobs(req.auth.id);
    return res.status(200).send(jobs);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const getSingleJob = async (req, res) => {
  try {
    const job = await getOneJob(req, auth.id, req.params.id);
    if (!job) {
      return res.status(404).send("Job does not exists");
    }
    return res.status(200).send(job);
  } catch (error) {
    return res.status(error.status).send(error.error);
  }
};

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
    return res.status(400).send("error.error");
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

const allJobs = async (req, res) => {
  try {
    const jobs = await getAllCompaniesJobs();
    const openJobs = jobs.filter((job) => job.status === "Open");
    return res.status(200).send(openJobs);
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
  getSingleJob,
  createNewJob,
  updateOneJob,
  deleteOneJob,
  allJobs,
  filteredJobs,
};
