const { user } = require("../models/users");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bycrypt = require("bcrypt");
const signJwt = require("../middlewares/sign-jwt");
const coookieParser = require("cookie-parser");
const {
  validateRegsiterParams,
} = require("../Joi-Validations/register-validation");

router.post("/", async (req, res) => {
  const { error } = validateRegsiterParams(req.body);
  if (error)
    return res.status(400).json({ emailError: error.details[0].message });

  let accountUser = await user.findOne({ email: req.body.email });
  if (accountUser)
    return res
      .status(400)
      .json({ alreadyRegistered: "User already registered" });
  accountUser = new user(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bycrypt.genSalt(11);
  accountUser.password = await bycrypt.hash(accountUser.password, salt);

  await accountUser.save();

  const token = signJwt(accountUser);
  const finalResult = _.pick(accountUser, ["_id", "name", "email"]);
  res
    .cookie("cftRegT", token, {
      maxAge: 1209600000,
      httpOnly: true,
      secure: true,
    })
    .send(finalResult);
});

module.exports = router;