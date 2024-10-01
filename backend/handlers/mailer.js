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

module.exports = { sendMessage };
