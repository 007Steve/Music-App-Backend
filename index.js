const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const songsRouter = require("./routes/songs");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

//Cors
const corsOpts = {
  origin: [
    "http://localhost:3000",
    "https://music-player-frontend-007steve.vercel.app/",
  ],
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

//Server
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/api", songsRouter);
app.use("/api", userRouter);
app.listen(port, () => console.log(`server is running great ${port}`));

//Momgoose connection
mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    else {
      return console.log(
        "MongoDB database connection established successfully"
      );
    }
  }
);

