const fs = require("fs");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(FormData);

const readTemplate = async (file) => {
  return new Promise((success, fail) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) return fail(err);
      return success(data);
    });
  });
};

const mailTemplates = {
  PASSWORD_RESET: {
    title: "Your Password reset link was generated",
    template: "reset_password.html",
  },
  CONTACT_MESSAGE: {
    title: "You have new contact email",
    template: "contact_message.html",
  },
};

const sendMail = async (to, type, data) => {
  console.log("to", to, type, data);
  const mg = mailgun.client({
    username: "api",
    key: process.env.API_KEY,
  });

  let title = mailTemplates[type].title;
  let templatePath = `${__dirname}/../../email_templates/${mailTemplates[type].template}`;

  let content = await readTemplate(templatePath);
  content = content.replace("{{fullName}}", data.fullName);
  content = content.replace("{{message}}", data.message);
  content = content.replace("{{email}}", data.email);
  content = content.replace("{{link}}", data.link);

  let options = {
    from: process.env.SENDER_EMAIL,
    to: to,
    subject: title,
    html: content,
  };

  try {
    const res = await mg.messages.create(process.env.DOMAIN, options);
    return res;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

module.exports = { sendMail };
