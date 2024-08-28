const {
  getFilteredApplications,
  createApplication,
  updateApplication,
} = require("../pkg/application/application");
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

const createDirectJob = async (req, res) => {
  try {
    await validate(req.body, JobValidate);
    const data = {
      companyId: req.auth.id,
      mentorId: req.body.mentorId,
      title: req.body.title,
      description: req.body.description,
      skillsRequired: req.body.skillsRequired,
      status: "OPEN",
      applicationType: "DIRECT",
    };
    const newJob = await createJob(data);

    const applicationData = {
      companyId: req.auth.id,
      mentorId: req.body.mentorId,
      jobId: newJob._id,
      status: "PENDING",
    };

    const newApplication = await createApplication(applicationData);
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

    let data = [];

    for (const job of jobs) {
      const applications = await getFilteredApplications({ jobId: job._id });
      let tempJob = {
        title: job.title,
        companyId: job.companyId,
        mentorId: job.mentorId,
        description: job.description,
        skillsRequired: job.skillsRequired,
        _id: job._id,
        status: job.status,
        applicationType: job.applicationType,
        applications: applications,
      };
      data.push(tempJob);
    }

    return res.status(200).send(data);
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
    return res.status(500).send("Internal Server Error");
  }
};

//filteredJobs
//da mozam da pratam id na kompanija i da mi gi dade spored id na taa kompanija

const filteredJobs = async (req, res) => {
  try {
    const { sort } = req.query;
    // console.log(req.query);
    const jobs = await getFilteredJobs(req.query);

    let data = [];
    for (const job of jobs) {
      const applications = await getFilteredApplications({ jobId: job._id });
      let tempJob = {
        title: job.title,
        companyId: job.companyId,
        mentorId: job.mentorId,
        description: job.description,
        skillsRequired: job.skillsRequired,
        _id: job._id,
        status: job.status,
        applicationType: job.applicationType,
        applications: applications,
        createdAt: job.createdAt,
      };
      data.push(tempJob);
    }

    return res.status(200).send(data);
  } catch (err) {
    return res.status(400).send(err.error);
  }
};

const cancelJobOffer = async (req, res) => {
  try {
    const canceledJob = {
      ...req.body,
      status: "CANCELED",
    };

    const applications = await getFilteredApplications({
      jobId: canceledJob._id,
    });

    for (let application of applications) {
      if (application.status === "PENDING") {
        await updateApplication(application._id, { status: "CANCELED" });
      }
    }

    await updateJob(canceledJob._id, { status: "CANCELED" });

    // await updateJob(rejectedApplication.jobId._id, {
    //   status: "REJECTED",
    // });
    // await

    return res.status(200).send(canceledJob);
  } catch (err) {
    console.log(err);
    return res.status(err.status).send(err.error);
  }
};

const doneJob = async (req, res) => {
  try {
    const canceledJob = {
      ...req.body,
      status: "DONE",
    };

    await updateJob(canceledJob._id, { status: "DONE" });

    return res.status(200).send(canceledJob);
  } catch (err) {
    console.log(err);
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
  createDirectJob,
  cancelJobOffer,
  doneJob,
};
