const axios = require("axios");
const { getKeys } = require("../../envKeys/allKeys");
const keysObjects = getKeys();

const key = keysObjects.CLIENT_SECRET_KEY;
const token = keysObjects.ACCESS_TOKEN_SECRET;

async function addMemberToBoard(req, res) {
  const { email, boardId } = req.body;

  const memberAddingUrl = `https://api.trello.com/1/boards/${boardId}/members?email=${email}&key=${key}&token=${token}`;

  try {
    const response = await axios.put(memberAddingUrl);

    if (response.status === 200) {
      console.log("Member added successfully");
      const success = true;
      return res.status(200).json({ success });
    }
  } catch (error) {
    console.error("Error:", error);
    console.error(error.message);

    res.status(400).json({ error });
  }
}

exports.addMemberToBoard = addMemberToBoard;
