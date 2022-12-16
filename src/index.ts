import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import route from "./routes/route";
import dotenv from "dotenv"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config()
mongoose.set("strictQuery",false)
mongoose
  .connect(process.env.DB_CRENDENTIALS)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });
  route(app)

app.listen(process.env.port,()=>{
  console.log("listening port 3000");
});
