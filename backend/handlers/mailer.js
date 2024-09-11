const mailer = require("../pkg/mailer");
const { getSection } = require("../pkg/config/index");
const sendMessage = async (req, res) => {
  try {
    const data = req.body;
    await mailer.sendMail(
      getSection("development").sender_email,
      "CONTACT_MESSAGE",
      data
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const sendPasswordResetMail = async (req, res) => {
  try {
    const result = await mailer.sendMail(
      req.body.to,
      "PASSWORD_RESET",
      req.body.message
    );
    return res.status(201).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

module.exports = { sendMessage, sendPasswordResetMail };
