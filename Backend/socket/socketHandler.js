const Message =
    require("../models/Message");

const onlineUsers = {};

module.exports = (io) => {
    io.on(
        "connection",
        (socket) => {
            console.log(
                "Connected",
                socket.id
            );

            socket.on(
                "join",
                (userId) => {
                    onlineUsers[
                        userId
                    ] = socket.id;

                    io.emit(
                        "onlineUsers",
                        onlineUsers
                    );
                }
            );

            socket.on(
                "talkRequest",
                (data) => {
                    const receiver =
                        onlineUsers[
                        data.receiverId
                        ];

                    if (receiver) {
                        io.to(
                            receiver
                        ).emit(
                            "newRequest",
                            data
                        );
                    }
                }
            );

            socket.on(
                "sendMessage",
                async (
                    data
                ) => {
                    await Message.create(
                        {
                            senderId:
                                data.senderId,
                            receiverId:
                                data.receiverId,
                            message:
                                data.message,
                        }
                    );

                    io.emit(
                        "receiveMessage",
                        data
                    );
                }
            );

            socket.on(
                "disconnect",
                () => {
                    console.log(
                        "Disconnected"
                    );
                }
            );
        }
    );
};