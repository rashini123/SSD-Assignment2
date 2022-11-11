import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import https from "https";
import fs from "fs";

import connectDB from "./src/config/db.js";
import userRoute from "./src/routes/userRoutes.js";

import fileUploadController from "./src/controllers/fileUploadController.js";

// connect db and load envs
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//set upload folder
app.use(express.static("/uploads/"));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Api is working");
});

//directing api calls to relavent routes
app.use("/api/users", userRoute);
app.use("/api/files/", fileUploadController);

// init certificate
const options = {
  key: fs.readFileSync("./src/certificates/key.pem"),
  cert: fs.readFileSync("./src/certificates/certificate.pem"),
};

const PORT = process.env.PORT || 8080;

const server = https.createServer(options, app);
server.listen(PORT, function (req, res) {
  console.log(
    `\x1b[36mServer running in "${process.env.NODE_ENV} mode" on port:${PORT}\x1b[0m`
  );
});
