require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./src/routers/userRoute");
const spamRouter = require("./src/routers/spamRoute");
const searchRouter = require("./src/routers/searchRoute");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);
app.use("/api", spamRouter);
app.use("/api/get", searchRouter);

app.get("/", (req, res) => {
  res.json({ message: "application running.." });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status,
    success: false,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}/`);
});
