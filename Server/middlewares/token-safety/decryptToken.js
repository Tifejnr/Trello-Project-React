const CryptoJS = require("crypto-js");
const { user } = require("../../models/users");
const { getKeys } = require("../../envKeys/allKeys");
const keysObject = getKeys();
const CRYPTO_SECRET_KEY = keysObject.CRYPTO_SECRET_KEY;

async function decryptToken(userDetails) {
  try {
    const accountUser = await user.findById(userDetails._id);
    const iv = accountUser.iv;
    const encryptedToken = accountUser.trello_token;
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedToken,
      CRYPTO_SECRET_KEY,
      {
        iv,
      }
    );

    // Convert the decrypted data to a readable string (assuming the original plaintext was a string)
    const decryptedToken = decryptedData.toString(CryptoJS.enc.Utf8);
    console.log(decryptedToken); // 'my message'

    return decryptedToken;
  } catch (error) {
    console.log("whakaa with decoding");
    console.log(error);
    return false;
  }
}

exports.decryptToken = decryptToken;
