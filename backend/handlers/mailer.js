const mailer = require("../pkg/mailer");

const sendMessage = async (req, res) => {
  try {
    await mailer.sendMessage();
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
