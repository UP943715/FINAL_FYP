const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("./src/helpers/databaseConnection");

const app = express();

//Basic Setup
app.use(cors());
app.use(express.json());
connectToDB();
app.use("/images", express.static("images"));

const PORT = 5001 || process.env.PORT;

// routes connection
app.use("/user", require("./src/routes/user"));
app.use("/api", require("./src/routes/api"));

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
