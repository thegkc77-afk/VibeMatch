const Message =
  require("../models/Message");

exports.getMessages =
  async (req, res) => {
    const {
      senderId,
      receiverId,
    } = req.params;

    const messages =
      await Message.find({
        $or: [
          {
            senderId,
            receiverId,
          },
          {
            senderId:
              receiverId,
            receiverId:
              senderId,
          },
        ],
      });

    res.json(messages);
  };