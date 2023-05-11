import express from "express";
import mongoose from "mongoose";
import userRoutes from "./src/routes/users.js";
import videoRoutes from "./src/routes/videos.js";
import commentRoutes from "./src/routes/comments.js";
import authRoutes from "./src/routes/auth.js";
import playlistRoutes from "./src/routes/playlists.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const corsOptions ={
    origin: "https://yt-clone.herokuapp.com",
    credentials: true,
    allowCredentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

const app = express();

const connect = () => {
  mongoose.connect(process.env.MONGO)
          .then(() => {
            console.log("DB Connected");
          })
          .catch(err => {
            throw err;
          });
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/playlists", playlistRoutes);
app.get("/api/", (req, res) => {res.send("Working")});

app.listen(process.env.PORT || 8080, () => {
  console.log("Connected!");
  connect();
})