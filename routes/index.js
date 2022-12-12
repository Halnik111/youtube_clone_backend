import express from "express";
import mongoose from "mongoose";

/* GET home page. */
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

app.listen(8080, () => {
  console.log("Connected!");
  connect();
})