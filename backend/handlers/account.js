const { allMentors, accountById } = require("../pkg/account/index");

const getAllMentors = async (req, res) => {
  try {
    const mentors = await allMentors();
    res.status(200).send(mentors);
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
