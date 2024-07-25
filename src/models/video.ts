import mongoose, { Document, Schema } from "mongoose";

// data to store about the video object
interface IVideo extends Document {
  videoId: string;
  name: string;
  extension: string;
  userId: mongoose.Types.ObjectId;
  extractedAudio: boolean;
  resizes: Map<string, string>;
  createdAt: Date;
}

// Define the Video schema
const videoSchema: Schema<IVideo> = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  extractedAudio: {
    type: Boolean,
    default: false,
  },
  resizes: {
    type: Map,
    of: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Video model
const Video = mongoose.model<IVideo>("Video", videoSchema);

export default Video;
