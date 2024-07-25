import mongoose, { Document, Schema } from "mongoose";

interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

// Define the Session schema
const sessionSchema: Schema<ISession> = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Session model
const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
