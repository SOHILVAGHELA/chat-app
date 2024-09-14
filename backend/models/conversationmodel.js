import mongoose from "mongoose";
const conversationmodel = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [{ type: mongoose.Schema.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", conversationmodel);
