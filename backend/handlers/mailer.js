const mailer = require("../pkg/mailer");

const sendMessage = async (req, res) => {
  try {
    const data = req.body;
    await mailer.sendMail(process.env.SENDER_EMAIL, "CONTACT_MESSAGE", data);
    res.status(200).send({ message: "Message Successfully Sent" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Message not sent. Please try again later" });
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
    return res.status(500).send("Internal server error");
  }
};

module.exports = { sendMessage, sendPasswordResetMail };
