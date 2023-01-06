import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

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
app.use(express.json());
app.use("/users", userRoutes);
app.use("/videos", videoRoutes);
app.use("/comments", commentRoutes);
app.use("/auth", authRoutes);

app.listen(8080, () => {
  console.log("Connected!");
  connect();
})