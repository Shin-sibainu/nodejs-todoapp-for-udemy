const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = 5000;

//ミドルウェア
app.use(express.static("./public")); //これでHTMLとか読み込める
app.use(express.json());

app.use("/api/v1/tasks", taskRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT || process.env.PORT, console.log(`サーバーが起動しました`));
  } catch (error) {
    console.log(error);
  }
};

start();

// app.listen(PORT, () => {
//   console.log(`サーバーが起動しました`);
// });
