const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");
const coookieParser = require("cookie-parser");
const app = express();
const session = require("express-session");
const { addMemberToBoard } = require("./utilis/boards/add");
const { fetchAllBoards } = require("./utilis/boards/fetchBoards");
const { login } = require("./utilis/oauth/oauth-and-callback");
const { callback } = require("./utilis/oauth/oauth-and-callback");
const { deleteMemberFromBoard } = require("./utilis/boards/delete");
const { getKeys } = require("./envKeys/allKeys");
const loginStatusChecker = require("./middlewares/jwt-related/login-status-checker");
require("dotenv").config();
require("./startup/prod")(app);

//Importing api routes
const registerUser = require("./routes/register-users");
const signInUser = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use(coookieParser());

//api routes declaarations
app.use("/api/register-user", registerUser);
app.use("/api/sign-in", signInUser);
app.use(
  express.static(
    path.join(__dirname, "../../Trello-Project-React/Frontend/dist")
  )
);

const keysObjects = getKeys();
const mongoDB_string = keysObjects.mongoDB_string;
mongoose
  .connect(mongoDB_string)
  .then(() => {
    console.log("connected to mong db");
  })
  .catch((err) => console.error("could not connect", err));

app.get("/", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "../../Trello-Project-React/Frontend/dist",
      "index.html"
    )
  );
});

app.set("view engine", "ejs");
app.set(
  "views",
  path.join(__dirname, "../../Trello-Project-React/Frontend/public/views")
);

// Routes Handling Section
// app.get("/", async (req, res) => {
//   res.render("trelloAdd");
// });

app.post("/isloggedIn", loginStatusChecker, async (req, res) => {
  res.json({ loggedIn: true });
});

app.get("/login", async (req, res) => {
  console.log(req.cookies);
  res.render("login");
});

app.post("/authorize", loginStatusChecker, async (req, res) => {
  login(req, res);
});

app.post("/login", async (req, res) => {
  login(req, res);
});

app.get("/callback", loginStatusChecker, async (req, res) => {
  console.log("was heree");
  callback(req, res);
});

app.post("/start", loginStatusChecker, async (req, res) => {
  fetchAllBoards(req, res);
});

app.post("/add", loginStatusChecker, async (req, res) => {
  addMemberToBoard(req, res);
});

app.post("/delete", loginStatusChecker, async (req, res) => {
  deleteMemberFromBoard(req, res);
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
