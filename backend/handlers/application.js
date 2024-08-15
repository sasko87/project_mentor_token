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

const createNewApplication = async (req, res) => {
  try {
    console.log(req.body);

    // await validate(req.body, ApplicationValidate);

    // TODO: preraboti
    const data = {
      ...req.body,
    };
    const newApplication = await createApplication(data);
    return res.status(200).send(newApplication);
  } catch (error) {
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

module.exports = {
  createNewApplication,
  updateOneApplication,
  deleteOneApplication,
  filteredApplications,
};
