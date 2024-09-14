import { Conversation } from "../models/conversationmodel.js";
import { Message } from "../models/Messagemodel.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMassage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMassage) {
      gotConversation.messages.push(newMassage._id);
    }
    await gotConversation.save();
    return res.status(200).json({ Message: "Send message Successfully" });
    //socket.io
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    return res.status(200).json(conversation?.messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};
