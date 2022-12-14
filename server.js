import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import https from "https";
import fs from "fs";

import connectDB from "./src/config/db.js";
import userRoute from "./src/routes/userRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";

import documentRoutes from "./src/routes/documentRoutes.js";

// connect db and load envs
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//set upload folder
app.use(express.static("/uploads/"));

app.get("/", (req, res) => {
  res.send("Api is working");
});

//directing api calls to relevant routes
app.use("/api/documents/", documentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoute);

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
