import dotenv from "dotenv";
import express from "express";
import router from "./router";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = Number(process.env.PORT) || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", router);

async function startApp() {
  try {
    app.listen(PORT, () => console.log("Server started. Port: " + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
