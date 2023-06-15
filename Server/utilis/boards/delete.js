const axios = require("axios");
const { deleteExecution } = require("./deleteExecution");
const key = process.env.CLIENT_SECRET_KEY;
const token = process.env.ACCESS_TOKEN_SECRET;
async function deleteMemberFromBoard(req, res) {
  const { boardId, username } = req.body;
  const boardDetailsFetchUrl = `https://api.trello.com/1/boards/${boardId}/members?&key=${key}&token=${token}`;

  try {
    const response = await axios.get(boardDetailsFetchUrl);
    const membersCollection = response.data;

    if (!membersCollection)
      return console.log("error occured with fetching board details");

    const foundUser = findUserByUsername(membersCollection, username);

    if (!foundUser)
      return (
        console.log("Invalid username"),
        res.status(500).json({ userNameNotFound: true })
      );

    const memberId = foundUser.id;
    const executeDelete = await deleteExecution(boardId, memberId);

    if (executeDelete == "OK") return res.status(200).json({ executeDelete });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error });
  }
}

function findUserByUsername(usersCollection, username) {
  return usersCollection.find((user) => user.username === username);
}

exports.deleteMemberFromBoard = deleteMemberFromBoard;
