import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let receivedToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      receivedToken = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(receivedToken, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      console.log("\x1b[31mToken is broken , cannot be Authorized!\x1b[0m");
      throw new Error("token is broken , cannot be Authorized");
    }
  }

  if (!receivedToken) {
    res.status(401);
    console.log("\x1b[31mNot an valid user!\x1b[0m");
    throw new Error("Not an valid user!");
  }
});

const adminAuth = (req, res, next) => {
  if (req.user && req.user.type == "Admin") {
    next();
  } else {
    res.status(401);
    console.log("\x1b[35mNot an valid user!\x1b[0m");
    throw new Error("Not an valid user!");
  }
};

const managerAuth = (req, res, next) => {
  if ((req.user && req.user.type == "Manager") || req.user.type == "Admin") {
    next();
  } else {
    res.status(401);
    console.log("\x1b[35mNot an valid user!\x1b[0m");
    throw new Error("Not an valid user!");
  }
};

const workerAuth = (req, res, next) => {
  if (
    (req.user && req.user.type == "Worker" && req.user.type == "Manager") ||
    req.user.type == "Admin"
  ) {
    next();
  } else {
    res.status(401);
    console.log("\x1b[35mNot an valid user!\x1b[0m");
    throw new Error("Not an valid user!");
  }
};

export { protect, adminAuth, managerAuth, workerAuth };
