const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/connectDB");

const app = express();
const port = process.env.PORT || 5000;
const userRouter=require("./routes/user.routes.js");
 connectToDB();
app.use(
  cors({
    origin: "http://localhost:5173",
    mathods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth/',userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
