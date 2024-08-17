const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const connectDB = require("./config/db.config");
connectDB();

const routes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server is up and running" });
});

app.use("/api/v1", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
