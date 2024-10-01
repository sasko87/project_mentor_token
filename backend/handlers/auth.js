const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  validate,
  AccountLogin,
  AccountRegister,
  ChangePasswordValidate,
} = require("../pkg/account/validate");
const {
  createAccount,
  getAccountByEmail,
  accountById,
  setNewPassword,
} = require("../pkg/account");

const { sendMail } = require("../pkg/mailer");

const login = async (req, res) => {
  try {
    await validate(req.body, AccountLogin);
    const { email, password } = req.body;
    const account = await getAccountByEmail(email);
    if (!account) {
      return res.status(400).send({ error: "Account not found" });
    }

    if (!bcrypt.compareSync(password, account.password)) {
      return res.status(400).send({ error: "Wrong password" });
    }

    const payload = {
      profileImage: account.profileImage,
      name: account.name,
      email: account.email,
      id: account._id,
      type: account.type,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const registerCheckExistingAccount = async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await getAccountByEmail(email);
    if (exists) {
      return res
        .status(400)
        .send({ error: "Account with this email already exists!" });
    } else {
      return res.status(200).send();
    }
  } catch (err) {
    console.log(err);
    return res.status(200).send(err.error);
  }
};

const register = async (req, res) => {
  try {
    await validate(req.body, AccountRegister);
    const { email, password } = req.body;

    req.body.password = bcrypt.hashSync(password);
    const acc = await createAccount(req.body);
    return res
      .status(201)
      .send({ message: "Your registration has been successfull" });
  } catch (err) {
    return res.status(400).send(err.error);
  }
};

const refreshToken = async (req, res) => {
  const payload = {
    ...req.auth,
    exp: (new Date().getTime() / 1000) * 7 * 24 * 60 * 60,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.status(200).send({ token });
};

const changePassword = async (req, res) => {
  validate(req.body, ChangePasswordValidate);
  const { newPassword, oldPassword } = req.body;
  const account = await accountById(req.auth.id);
  if (!bcrypt.compareSync(oldPassword, account.password)) {
    return res.status(400).send({ error: "Old password is incorrect" });
  }

  if (newPassword === oldPassword) {
    return res
      .status(400)
      .send({ error: "New password cannot be the same as Old password" });
  }
  const hashNewPassword = bcrypt.hashSync(newPassword);

  await setNewPassword(account._id.toString(), hashNewPassword);
  return res.status(200).send({ message: "Password was successfuly changed" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await getAccountByEmail(email);

  if (!user) {
    return res
      .status(400)
      .send({ error: "User with this email is not registered!" });
  }

  const secret = process.env.JWT_SECRET;

  const payload = {
    email: user.email,
    name: user.name,
    id: user.id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "30m" });
  const link = `http://localhost:5173/reset-password/${user.id}/${token}`;

  try {
    await sendMail(user.email, "PASSWORD_RESET", { user, link });
    return res
      .status(200)
      .send({ message: "Password reset link has been sent to your email..." });
  } catch (err) {
    return res.status(500).send({ error: "Mail not sent. Try again later" });
  }
};
//TODO ova mislam ne mi treba da proveram
const resetPassTemplate = async (req, res) => {
  const { id, token } = req.params;

  const user = await accountById(id);

  if (!user) {
    return res.status(400).send("User not registered!");
  }

  const secret = process.env.JWT_SECRET + user.password;
  console.log("resetpasstemlata", user);

  try {
    const payload = jwt.verify(token, secret);
    res.render("reset-password", { email: user.email });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const hashedPass = bcrypt.hashSync(password);
  const user = await accountById(id);
  const secret = process.env.JWT_SECRET;

  try {
    const payload = jwt.verify(token, secret);
    if (!payload) {
      res.send({ error: "Token not valid!" });
    }

    await setNewPassword(user.id, hashedPass);
    res.status(200).send({ message: "Password reset successful!" });
  } catch (err) {
    return res.status(500).send({ error: "Password not changed" });
  }
};

module.exports = {
  login,
  register,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
  resetPassTemplate,
  registerCheckExistingAccount,
};
