const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT||5000;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(
  cors({
    origin: "http://localhost:5173/",
    mathods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials:true
  })
);
app.use(cookieParser());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
