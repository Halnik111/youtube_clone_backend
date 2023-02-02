import express from "express";
import mongoose from "mongoose";
import userRoutes from "./src/routes/users.js";
import videoRoutes from "./src/routes/videos.js";
import commentRoutes from "./src/routes/comments.js";
import authRoutes from "./src/routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const corsOptions ={
    origin: "http://localhost:3000",
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
app.use("/users", userRoutes);
app.use("/videos", videoRoutes);
app.use("/comments", commentRoutes);
app.use("/auth", authRoutes);

app.listen(8080, () => {
  console.log("Connected!");
  connect();
})