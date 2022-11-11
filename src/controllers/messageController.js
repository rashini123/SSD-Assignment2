import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

import Message from "../models/messageModel.js";
import { encryptMessage, decryptMessage } from "../utils/messageEncryption.js";

const ObjectId = mongoose.Types.ObjectId;

// @desc  Create Message
// @route POST /api/messages/
// @access Auth USER

const saveMessage = asyncHandler(async (req, res) => {
  const { sender, receiver, message } = req.body;

  //encrypt message
  const encryptedMessage = encryptMessage(message, receiver);
  const messageNew = await Message.create({
    sender,
    receiver,
    message: encryptedMessage,
  });

  if (messageNew) {
    res.status(201).json({
      _id: messageNew._id,
    });
  } else {
    res.status(200).send({ success: false, message: "Error!" });
    throw new Error("Error! Cant create new message.");
  }
});

// @desc  View All Messages
// @route GET /api/messages/
// @access Admin
const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({});
  res.json(messages);
});

// @desc  View All Messages Received
// @route GET /api/messages/received/:id
// @access Auth User
const getAllReceivedMessages = asyncHandler(async (req, res) => {
  const userID = req.params.id;
  if (userID) {
    try {
      const messagesEncrypted = await Message.find({
        receiver: ObjectId(userID),
      });

      const messagesDecrypted = [];
      messagesEncrypted.forEach((data) => {
        let msg = data.message;
        let decryptedMsg = decryptMessage(msg, userID);
        data.message = decryptedMsg;
        messagesDecrypted.push(data);
      });

      res.json(messagesDecrypted);
    } catch (error) {
      console.log(error);
      res.status(200).send({
        success: false,
        message: "Error!",
      });
    }
  } else {
    res.status(200).send({
      success: false,
      message: "No id found!",
    });
  }
});

// @desc  View All Messages Sent
// @route GET /api/messages/sent/:id
// @access Auth User
const getAllSentMessages = asyncHandler(async (req, res) => {
  const userID = req.params.id;
  if (userID) {
    try {
      const messagesEncrypted = await Message.find({
        sender: ObjectId(userID),
      });

      const messagesDecrypted = [];
      messagesEncrypted.forEach((data) => {
        let msg = data.message;
        let msgKey = data.receiver;
        let decryptedMsg = decryptMessage(msg, msgKey);
        data.message = decryptedMsg;
        messagesDecrypted.push(data);
      });

      res.json(messagesDecrypted);
    } catch (error) {
      console.log(error);
      res.status(200).send({
        success: false,
        message: "Error!",
      });
    }
  } else {
    res.status(200).send({
      success: false,
      message: "No id found!",
    });
  }
});

// @desc  Delete message
// @route GET /api/messages/:id
// @access Auth User
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (message) {
    await Message.deleteOne({ _id: req.params.id })
      .then((result) => {
        res
          .status(200)
          .send({ success: true, message: "Message Deleted Successfully!" });
      })
      .catch((error) => {
        res.status(200).send({ success: false, message: error });
      });
  } else {
    res.status(200).send({ success: false, message: "Message not found!" });
  }
});

export {
  saveMessage,
  getAllMessages,
  getAllReceivedMessages,
  getAllSentMessages,
  deleteMessage,
};
