import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const DeviceSchema = new Schema(
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
DeviceSchema.plugin(uniqueValidator);

export default mongoose.model("Device", DeviceSchema);
