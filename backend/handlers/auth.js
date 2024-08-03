const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  validate,
  AccountLogin,
  AccountRegister,
} = require("../pkg/account/validate");
const { createAccount, getAccountByEmail } = require("../pkg/account");
const { getSection } = require("../pkg/config/index");

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
      email: account.email,
      id: account._id,
      type: account.type,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  try {
    await validate(req.body, AccountRegister);
    const { email, password } = req.body;
    const exists = await getAccountByEmail(email);
    if (exists) {
      throw {
        code: 400,
        error: "Account with this email already exists!",
      };
    }
    req.body.password = bcrypt.hashSync(password);
    const acc = await createAccount(req.body);
    return res.status(201).send(acc);
  } catch (err) {
    console.log(err);
    return res.status(200).send("err.error");
  }
};

module.exports = { login, register };
