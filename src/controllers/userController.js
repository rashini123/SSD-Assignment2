import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import getDecryptedTokenValue from "../utils/getDecryptedTokenValue.js";

// @desc  Create Admin
// @route POST /api/users/admin
// @access DEV TEAM
const createAdminUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, type } = req.body;

  const chk_user_existence = await User.findOne({ email: email });

  if (chk_user_existence) {
    res.status(400);
    throw new Error(`There's a member already registered with that mail`);
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
    type,
  });
  if (user) {
    res.status(201).send({
      success: true,
      message: "User created successfully!",
    });
  } else {
    res.status(400);
    throw new Error("This user account cannot be created. Try again");
  }
});

// @desc  Create Workers/Managers
// @route POST /api/users/
// @access Admin
const createUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, type } = req.body;

  const chk_user_existence_email = await User.findOne({ email: email });
  const chk_user_existence_uname = await User.findOne({ username: username });

  var userExists = false;

  if (chk_user_existence_email) {
    userExists = true;
    res.status(200).send({
      success: false,
      message: "There is a member already registered with the email",
    });
    console.log("\x1b[35mDuplicate Key users!\x1b[0m");
  } else {
    if (chk_user_existence_uname) {
      userExists = true;
      res.status(200).send({
        success: false,
        message: "There is a member already registered with the username",
      });
    }
    console.log("\x1b[35mDuplicate Key users!\x1b[0m");
  }

  if (!userExists) {
    const user = await User.create({
      name,
      username,
      email,
      password,
      type,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        success: true,
        message: "User created successfully!",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "This user account cannot be created. Try again",
      });
      throw new Error("This user account cannot be created. Try again");
    }
  }
});

// @desc  View All Users
// @route GET /api/users/
// @access Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

// @desc  Delete User
// @route Delete /api/users/:id
// @access Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: req.params.id })
      .then((result) => {
        res
          .status(200)
          .send({ success: true, message: "User Deleted Successfully!" });
      })
      .catch((error) => {
        res.status(200).send({ success: false, message: error });
      });
  } else {
    res.status(200).send({ success: false, message: "User not found!" });
  }
});

// @desc  Get User By ID
// @route POST /api/users/login
// @access Auth User
const getUserAccountByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      type: user.type,
    });
  } else {
    res.status(200).send({ success: false, message: "User not found!" });
    throw new Error("User cannot be found");
  }
});

// @desc  Login All Users
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const userWithUserName = await User.findOne({ username: usernameOrEmail });

  if (userWithUserName && (await userWithUserName.matchPassword(password))) {
    res.json({
      _id: userWithUserName._id,
      name: userWithUserName.name,
      email: userWithUserName.email,
      type: userWithUserName.type,
      username: userWithUserName.username,
      token: generateToken(userWithUserName._id),
    });
  } else {
    const userWithEmail = await User.findOne({ email: usernameOrEmail });
    if (userWithEmail && (await userWithEmail.matchPassword(password))) {
      res.json({
        _id: userWithEmail._id,
        name: userWithEmail.name,
        email: userWithEmail.email,
        type: userWithEmail.type,
        username: userWithEmail.username,
        token: generateToken(userWithEmail._id),
      });
    } else {
      res.status(401);
      throw new Error("Entered Credentials are not correct");
    }
  }
});

// @desc Validate User Token
// @route POST /api/users/token/:tokenID
// @access Public
const validateUserToken = asyncHandler(async (req, res) => {
  const userToken = req.params.tokenID;
  const tokenResult = getDecryptedTokenValue(userToken);

  if (tokenResult) {
    const user = await User.findById(tokenResult.id);
    if (user) {
      res.status(200).send({
        success: true,
        message: "Not Expired!",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          type: user.type,
          username: user.username,
        },
      });
    } else {
      res.status(401).send({ success: false, message: "Unauthorized!" });
    }
  } else {
    // res.status(200).send({ success: false, message: "Expired!" });
    res.status(401).send({ success: false, message: "Unauthorized!" });
  }
});

// @desc  View All Users
// @route GET /api/users/all
// @access Admin
const getUsersForMessaging = asyncHandler(async (req, res) => {
  const users = await User.find({}, "name");
  const allUsers = [];

  if (users && users.length > 0) {
    users.forEach((element) => {
      if (element.name == "Super Admin" || req.user.name == element.name) {
      } else {
        allUsers.push(element);
      }
    });
    res.json(allUsers);
  } else {
    res.json([]);
  }
});

export {
  createAdminUser,
  createUser,
  getUserAccountByID,
  getUsers,
  loginUser,
  deleteUser,
  validateUserToken,
  getUsersForMessaging,
};
