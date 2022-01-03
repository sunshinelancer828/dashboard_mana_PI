import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UploadSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    ip: {
      type: String,
      required: true
    },
    wid: {
      type: String,
      required: true
    },
    wpass: {
      type: String,
      required: true
    },
    link: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

mongoose.set("useCreateIndex", true);
UploadSchema.plugin(uniqueValidator);

export default mongoose.model("Upload", UploadSchema);
