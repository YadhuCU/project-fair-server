require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = 3000 || process.env.PORT;
const router = require("./routes/route");
require("./db/connection.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(router); // always after cors

app.listen(PORT, () => {
  console.log("Sever is runnig at " + PORT);
});

app.get("/", (req, res) => {
  res.status(200).send("<h1>Waiting for client requests....</h1>");
});
