const axios = require("axios");
const { decryptToken } = require("../../middlewares/token-safety/decryptToken");
const { getKeys } = require("../../envKeys/allKeys");
// const keysObj = getKeys();

// //fetching env variables
// const key = keysObj.CLIENT_SECRET_KEY;

async function fetchAllBoards(req, res) {
  // const token = await decryptToken(userDetails);

  const token =
    "688f89f00f6103cb099e8413af68ccd5ae446c869875aae282b5b5efafbb3c6d";

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
