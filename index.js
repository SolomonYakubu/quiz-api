const express = require("express");
const app = express();
const quizRoutes = require("./routes/quiz");

app.use("/quiz", quizRoutes);
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`server is running at ${port}`));
