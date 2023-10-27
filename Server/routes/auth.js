const { user } = require("../models/users");
const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const { signJwt } = require("../middlewares/jwt-related/sign-jwt");
const { validateSignInParams } = require("../Joi-Validations/SignIn");

const websiteUrl = "https://collabfortrello.com/";

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validateSignInParams(req.body);

  if (error)
    return res.status(400).json({ joiError: error.details[0].message });

  try {
    const accountUser = await user.findOne({ email: req.body.email });
    if (!accountUser)
      return res
        .status(401)
        .json({ invalidLoginDetails: "Invalid email or password" });
    const validPassword = await bycrypt.compare(
      req.body.password,
      accountUser.password
    );

    if (!validPassword)
      return res
        .status(401)
        .json({ invalidLoginDetails: "Invalid email or password" });

    const token = await signJwt(accountUser);

    if (!token) return console.log("token not found");

    const cookieOptions = {
      maxAge: 1209600000,
      secure: true,
      httpOnly: true,
    };

    console.log("signed in");

    res.cookie("cftAuth", token, cookieOptions).json({ signedIn: true, token });
    tokenNow = req.cookies.cftAuth;

    console.log(tokenNow, "now");
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

module.exports = router;
