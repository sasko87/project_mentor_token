const {
  createApplication,
  updateApplication,
  deleteApplication,
  getFilteredApplications,
} = require("../pkg/application/application");
const {
  validate,
  ApplicationValidate,
} = require("../pkg/application/validate");
const { updateJob } = require("../pkg/job/job");

const createNewApplication = async (req, res) => {
  try {
    console.log("ne application", req);

    // await validate(req.body, ApplicationValidate);

    // TODO: preraboti
    const data = {
      ...req.body,
    };
    const newApplication = await createApplication(data);
    return res.status(200).send(newApplication);
  } catch (error) {
    // console.log("dderror", error);
    return res.status(400).send("error.error");
  }
};

const updateOneApplication = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };
    const newApplication = await updateApplication(req.params.id, data);
    return res.status(200).send(newApplication);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const deleteOneApplication = async (req, res) => {
  try {
    await deleteApplication(req.params.id);
    return res.status(200).send("Application was successfuly deleted");
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};
//filteredApplications
//da mozam da pratam id na kompanija i da mi gi dade spored id na taa kompanija

const filteredApplications = async (req, res) => {
  try {
    console.log(req);
    const applications = await getFilteredApplications(req.query);
    return res.status(200).send(applications);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const getMentorDirectApplications = async (req, res) => {
  try {
    const applications = await getFilteredApplications({
      mentorId: req.auth.id,
      status: "PENDING",
    });
    const directApplications = applications.filter(
      (application) =>
        application.jobId.applicationType === "DIRECT" &&
        application.jobId.status === "OPEN"
    );
    res.status(200).send(directApplications);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const acceptApplication = async (req, res) => {
  try {
    const acceptedApplication = {
      ...req.body,
      status: "ACCEPTED",
    };

    const applications = await getFilteredApplications({
      jobId: acceptedApplication.jobId,
    });

    for (let application of applications) {
      if (application.id !== acceptedApplication._id) {
        await updateApplication(application._id, { status: "REJECTED" });
      }
    }

    await updateApplication(acceptedApplication._id, { status: "ACCEPTED" });

    await updateJob(acceptedApplication.jobId, {
      mentorId: acceptedApplication.mentorId._id,
      status: "IN_PROGRESS",
    });

    return res.status(200).send(applications);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const rejectApplication = async (req, res) => {
  try {
    const rejectedApplication = {
      ...req.body,
      status: "REJECTED",
    };

    console.log(rejectedApplication);
    await updateApplication(rejectedApplication._id, { status: "REJECTED" });

    return res.status(200).send(rejectedApplication);
  } catch (err) {
    console.log(err);
    return res.status(err.status).send(err.error);
  }
};

const acceptDirectApplication = async (req, res) => {
  try {
    const acceptedApplication = {
      ...req.body,
      status: "ACCEPTED",
    };

    const applications = await getFilteredApplications({
      jobId: acceptedApplication.jobId,
    });

    await updateApplication(acceptedApplication._id, { status: "ACCEPTED" });

    await updateJob(acceptedApplication.jobId, {
      status: "IN_PROGRESS",
    });

    return res.status(200).send(applications);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const rejectDirectApplication = async (req, res) => {
  try {
    const rejectedApplication = {
      ...req.body,
      status: "REJECTED",
    };

    await updateApplication(rejectedApplication._id, { status: "REJECTED" });

    await updateJob(rejectedApplication.jobId._id, {
      status: "REJECTED",
    });

    return res.status(200).send(rejectedApplication);
  } catch (err) {
    console.log(err);
    return res.status(err.status).send(err.error);
  }
};

const getApplicationsSentByMentor = async (req, res) => {
  try {
    const applications = await getFilteredApplications({
      mentorId: req.auth.id,
      status: "PENDING",
    });
    console.log(applications);
    const sentApplications = applications.filter(
      (application) =>
        application.jobId.applicationType === "OPEN_FOR_ALL" &&
        application.status === "PENDING"
    );
    res.status(200).send(sentApplications);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createNewApplication,
  updateOneApplication,
  deleteOneApplication,
  filteredApplications,
  acceptApplication,
  rejectApplication,
  getMentorDirectApplications,
  acceptDirectApplication,
  rejectDirectApplication,
  getApplicationsSentByMentor,
};
