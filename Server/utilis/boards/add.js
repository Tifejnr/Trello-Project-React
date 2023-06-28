const { getKeys } = require("../../envKeys/allKeys");
const axios = require("axios");

const keysObj = getKeys();
const key = keysObj.CLIENT_SECRET_KEY;
const token = keysObj.ACCESS_TOKEN_SECRET;

async function addMemberToBoard(req, res) {
  const { boardId, email } = req.body;
  const memberAddingUrl = `https://api.trello.com/1/boards/${boardId}/members?email=${email}&key=${key}&token=${token}`;
  try {
    const response = await axios.put(memberAddingUrl);

    if (response.status === 200) {
      console.log("Member added successfully");
      const success = true;
      res.status(200).json({ success });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error });
  }
}

exports.addMemberToBoard = addMemberToBoard;
