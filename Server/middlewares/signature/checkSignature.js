const { user } = require("../../models/users");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const JWT_PRIVATE_KEY = keysObject.JWT_PRIVATE_KEY;
const creditsNoPerAction = 1;

module.exports = async function (req, res, next) {
  const { clientSignature, creditsCharged } = req.body;

  try {
    const userId = userDetails._id;
    const accountUser = await user.findById(userId);
    const serverSignature = accountUser.sessionSignature;
    const creditsAvailable = accountUser.credits;

    if (creditsAvailable < 1)
      return res.status(402).json({ insufficientCredits: true });

    if (clientSignature == serverSignature) {
      const newSessionSignature = `${clientSignature}${JWT_PRIVATE_KEY}`;
      accountUser.sessionSignature = newSessionSignature;

      //deduct a credit since it's a new session
      const remainingCredits = accountUser.credits - Number(creditsCharged);

      accountUser.credits = remainingCredits;

      await accountUser.save();

      creditsDeducted = true;
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ signatureCheckError: error });
  }
};
