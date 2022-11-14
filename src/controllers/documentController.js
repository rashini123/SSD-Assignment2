import asyncHandler from "express-async-handler";
import Document from "../models/documentModel.js";
import fs from "fs";
import getDecryptedTokenValue from "../utils/getDecryptedTokenValue.js";
import User from "../models/userModel.js";

// @desc  Create Document
// @route POST /api/documents/
// @access Manager
const saveDocument = asyncHandler(async (req, res) => {
  const { uploadedBy, type, filePath, name, fName } = req.body;

  try {
    //save to database
    const document = await Document.create({
      name,
      uploadedBy,
      type,
      filePath,
      fName,
    });
    if (document) {
      res.status(201).send({
        success: true,
        message: "Document saved successfully!",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Error! Can't save document.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error!",
    });
  }
});

// @desc Get All Documents
// @route GET /api/documents/
// @access Manager
const viewAllDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({}).populate("uploadedBy", "name");
  res.json(documents);
});

// @desc Download Document
// @route GET /api/documents/download/:id
// @access Manager
const downloadDocument = asyncHandler(async (req, res) => {
  let fileID = req.params.id;

  // Validate user token
  let userToken = req.params.token;
  const tokenDecrypt = getDecryptedTokenValue(userToken);

  if (tokenDecrypt) {
    const user = await User.findById(tokenDecrypt.id).select("-password");

    if (user && user.type == "Manager") {
      const documentRes = await Document.findById(fileID);
      if (documentRes) {
        try {
          const fileName = documentRes.fName;
          const fileURL = "./" + documentRes.filePath;
          const stream = fs.createReadStream(fileURL);
          res.set({
            "Content-Disposition": `attachment; filename=${fileName}`,
          });
          stream.pipe(res);
        } catch (e) {
          console.error(e);
          res.status(200).send({
            success: false,
            message: "Error! Can't download document.",
          });
        }
      } else {
        res.status(200).send({
          success: false,
          message: "Error! Can't download document.",
        });
      }
    } else {
      res.status(401).send({
        success: false,
        message: "Error! Unauthorized!",
      });
    }
  } else {
    res.status(401).send({
      success: false,
      message: "Error! Unauthorized!",
    });
  }
});

export { saveDocument, viewAllDocuments, downloadDocument };
