const {
  allMentors,
  accountById,
  updateAccount,
} = require("../pkg/account/index");
const { getFilteredApplications } = require("../pkg/application/application");
const { getFilteredJobs } = require("../pkg/job/job");

const getAllMentors = async (req, res) => {
  try {
    const mentors = await allMentors();

    let data = [];

    for (const mentor of mentors) {
      const jobs30 = await getFilteredJobs({
        mentorId: mentor._id,
        updatedAt: {
          $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
        status: "DONE",
      });
      const jobs60 = await getFilteredJobs({
        mentorId: mentor._id,
        updatedAt: {
          $gte: new Date(new Date().getTime() - 60 * 24 * 60 * 60 * 1000),
        },
        status: "DONE",
      });
      let tempMentor = {
        desc: mentor.desc,
        email: mentor.email,
        name: mentor.name,
        skills: mentor.skills,
        type: mentor.type,
        _id: mentor._id,
        doneJobsInLast30Days: jobs30,
        doneJobsInLast60Days: jobs60,
      };
      data.push(tempMentor);
    }

    res.status(200).send(data);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const getAccoutData = async (req, res) => {
  try {
    const account = await accountById(req.auth.id);
    res.status(200).send(account);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const getMentorStatistics = async (req, res) => {
  try {
    const account = await accountById(req.auth.id);
    const jobs = await getFilteredJobs({ mentorId: account._id });
    const applications = await getFilteredApplications({
      mentorId: account._id,
    });
    const totalJobs = jobs.length;
    const totalAssignedJobs = jobs.filter(
      (job) => job.status === "DONE" || job.status === "IN_PROGRESS"
    ).length;
    const applicationsSent = applications.filter(
      (application) => application.jobId.applicationType === "OPEN_FOR_ALL"
    ).length;
    const doneJobs = jobs.filter((job) => job.status === "DONE").length;

    let data = {
      desc: account.desc,
      email: account.email,
      name: account.name,
      skills: account.skills,
      type: account.type,
      _id: account._id,
      phone: account.phone,
      position: account.position,
      jobs: jobs,
      applications,
      totalJobs,
      totalAssignedJobs,
      applicationsSent,
      doneJobs,
    };

    res.status(200).send(data);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const getStartupStatistics = async (req, res) => {
  try {
    const account = await accountById(req.auth.id);
    const jobs = await getFilteredJobs({ companyId: account._id });
    const applications = await getFilteredApplications({
      companyId: account._id,
    });
    const jobsInMonth = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;

    const totalAssignedJobs = jobs.filter(
      (job) =>
        (job.status === "DONE" && job.updatedAt >= jobsInMonth) ||
        (job.status === "IN_PROGRESS" && job.updatedAt >= jobsInMonth)
    ).length;

    const doneJobs = jobs.filter(
      (job) => job.status === "DONE" && job.updatedAt >= jobsInMonth
    ).length;

    let data = {
      email: account.email,
      name: account.name,
      type: account.type,
      _id: account._id,
      jobs: jobs,
      applications,
      totalAssignedJobs,
      doneJobs,
    };
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(err.status).send(err.error);
  }
};

const getAccoutDataById = async (req, res) => {
  try {
    const accountData = await accountById(req.params.id);
    res.status(200).send(accountData);
  } catch (err) {
    return res.status(400).send(err.error);
  }
};

const updateMentorAccount = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      desc: req.body.desc,
      email: req.body.email,
      phone: req.body.phone,
      skills: req.body.skills,
      position: req.body.position,
    };
    await updateAccount(req.body.id, data);
    return res.status(200).send({ message: "account updated" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllMentors,
  getAccoutData,
  getAccoutDataById,
  updateMentorAccount,
  getMentorStatistics,
  getStartupStatistics,
};
