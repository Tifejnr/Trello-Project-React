const axios = require("axios");
const { deleteExecution } = require("./deleteExecution");

async function deleteMemberFromBoard(req, res) {
  const { boardId, username } = req.body;
  const key = "3871b737b5e006da43d0e48f6d8f68ee";
  const token =
    "688f89f00f6103cb099e8413af68ccd5ae446c869875aae282b5b5efafbb3c6d";
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

// Find object by username
function findUserByUsername(usersCollection, username) {
  return usersCollection.find((user) => user.username === username);
}

exports.deleteMemberFromBoard = deleteMemberFromBoard;
