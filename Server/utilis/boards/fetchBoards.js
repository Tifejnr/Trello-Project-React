const axios = require("axios");
const {
  getDecryptedToken,
} = require("../../middlewares/token-safety/get-decrypted-token");
const { getKeys } = require("../../envKeys/allKeys");
const keysObj = getKeys();

//fetching env variables
const key = keysObj.CLIENT_SECRET_KEY;
const token = keysObj.ACCESS_TOKEN_SECRET;

async function fetchAllBoards(req, res) {
  console.log(userDetails);
  const token = await getDecryptedToken(userDetails);
  const boardsFetchingUrl = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;

  try {
    const response = await axios.get(boardsFetchingUrl);
    const boards = response.data;

    res.status(200).json({ boards });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error });
  }
}

exports.fetchAllBoards = fetchAllBoards;
