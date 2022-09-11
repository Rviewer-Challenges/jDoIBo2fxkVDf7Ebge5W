const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/resource", require("./routes/resourceRoute"));
app.use("/api/website", require("./routes/websiteRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/comment", require("./routes/commentRoute"));

app.get("*", (req, res) => {
  res.send("Resourcenter server working");
});

module.exports = app;
