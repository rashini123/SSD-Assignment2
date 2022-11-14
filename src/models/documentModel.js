import mongoose from "mongoose";

const documentModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    fName: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    type: {
      type: String,
      required: false,
    },
    filePath: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("documents", documentModel);
export default Document;
