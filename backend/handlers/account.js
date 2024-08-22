const { allMentors, accountById } = require("../pkg/account/index");
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
    //TODO: trgni go passwordot od tuka
    const accountData = await accountById(req.auth.id);
    res.status(200).send(accountData);
  } catch (err) {
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

module.exports = { getAllMentors, getAccoutData, getAccoutDataById };
