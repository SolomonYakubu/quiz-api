const express = require("express");
const app = express();
const cors = require("cors");
const quizRoutes = require("./routes/quiz");
const signUpRoutes = require("./routes/signUp");
const signInRoutes = require("./routes/signIn");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("connected to db"))
  .catch((err) => console.log(err));

// const db = mongoose.connection;
// db.on("error", (error) => console.log(error));
// db.once("open", () => console.log("connected!!!"));

app.use(cors());
app.use(express.json());
app.use("/quiz", quizRoutes);
app.use("/signUp", signUpRoutes);
app.use("/signIn", signInRoutes);
app.use("/user", userRoutes);
const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`server is running at ${port}`));
