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
const signatureChecker = require("./middlewares/signature/checkSignature");
const userToken = require("./middlewares/token-safety/decryptToken");
const isUserAuthorized = require("./middlewares/jwt-related/authorizedUserVerification");
require("dotenv").config();
require("./startup/prod")(app);

//webhooks set here so req.body does not get parsed into json before reaching the route. raw body is needed
const webhooks = require("./routes/Payments/webhooks");
app.use("/api/checkout/webhooks", webhooks);

//Connect to mong db
const keysObjects = getKeys();
const mongoDB_string = keysObjects.mongoDB_string;
mongoose
  .connect(mongoDB_string)
  .then(() => {
    console.log("connected to mong db");
  })
  .catch((err) => console.error("could not connect", err));

app.use(cors());
app.use(express.json());
app.use(coookieParser());

//Importing api routes
const registerUser = require("./routes/register-users");
const signInUser = require("./routes/auth");
const paymentsHandling = require("./routes/Payments/checkout");
const dashboard = require("./routes/dashboard");

//api routes declaarations
app.use("/api/register-user", registerUser);
app.use("/api/sign-in", signInUser);
app.use("/api/dashboard", dashboard);
app.use("/api/checkout", loginStatusChecker, paymentsHandling);
app.use("/api/checkout/webhooks", webhooks);
app.use(
  express.static(
    path.join(__dirname, "../../Trello-Project-React/Frontend/dist")
  )
);

//Won't be accessible by React route, server owns this route
app.get("/callback", loginStatusChecker, async (req, res) => {
  callback(req, res);
});

app.get("*", function (req, res) {
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
  path.join(__dirname, "../../Trello-Project-React/Frontend/views")
);

// Routes Handling Section
// app.get("/", async (req, res) => {
//   res.render("trelloAdd");
// });

app.post("/isloggedIn", loginStatusChecker, async (req, res) => {
  res.json({ loggedIn: true });
});
app.post(
  "/is-account-authorized",
  [loginStatusChecker, isUserAuthorized],
  async (req, res) => {
    res.json({ authorized: true });
  }
);

app.post("/authorize", loginStatusChecker, async (req, res) => {
  login(req, res);
});

app.post("/start", async (req, res) => {
  fetchAllBoards(req, res);
});

app.post("/add", async (req, res) => {
  addMemberToBoard(req, res);
});

app.post(
  "/delete",
  [loginStatusChecker, userToken, signatureChecker],
  async (req, res) => {
    deleteMemberFromBoard(req, res);
  }
);
app.post("/trial", async (req, res) => {
  console.log(req.body);
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
