const {
  allMentors,
  accountById,
  updateAccount,
  Account,
  allStartups,
  accountFilter,
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

const getAllStartups = async (req, res) => {
  try {
    const startups = await allStartups();
    res.status(200).send(startups);
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

    const currentDate = new Date();
    const jobsInMonth = new Array(12).fill(0);

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const updatedDate = new Date(job.updatedAt);
      const monthsDifference =
        currentDate.getFullYear() * 12 +
        currentDate.getMonth() -
        (updatedDate.getFullYear() * 12 + updatedDate.getMonth());

      // Check if the job was updated within the last 12 months
      if (monthsDifference >= 0 && monthsDifference < 12) {
        const index = 11 - monthsDifference;
        jobsInMonth[index]++;
      }
    }

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
      jobsInMonth,
    };

    res.status(200).send(data);
  } catch (err) {
    return res.status(err.status).send(err.error);
  }
};

const getStartupStatistics = async (req, res) => {
  try {
    const jobs = await getFilteredJobs({});
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
      jobs: jobs,
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
    const updatedAccount = await accountById(req.body.id);
    return res.status(200).send(updatedAccount);
  } catch (err) {
    console.log(err);
  }
};

const searchMentor = async (req, res) => {
  try {
    const { name } = req.query;
    const results = await accountFilter({
      name: new RegExp(name, "i"),
      type: "mentor",
    });

    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while searching" });
  }
};

const searchStartup = async (req, res) => {
  try {
    const { name } = req.query;
    const results = await accountFilter({
      name: new RegExp(name, "i"),
      type: "startup",
    });

    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while searching" });
  }
};

module.exports = {
  getAllMentors,
  getAccoutData,
  getAccoutDataById,
  updateMentorAccount,
  getMentorStatistics,
  getStartupStatistics,
  searchMentor,
  searchStartup,
  getAllStartups,
};
