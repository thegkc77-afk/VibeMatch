require("dotenv").config();

const express =
    require("express");

const cors =
    require("cors");

const http =
    require("http");

const {
    Server,
} = require(
    "socket.io"
);

const connectDB =
    require("./config/db");

const authRoutes =
    require(
        "./routes/authRoutes"
    );

const userRoutes =
    require(
        "./routes/userRoutes"
    );

const chatRoutes =
    require(
        "./routes/chatRoutes"
    );

const socketHandler =
    require(
        "./socket/socketHandler"
    );

connectDB();

const app =
    express();

app.use(cors());

app.use(express.json());

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/users",
    userRoutes
);

app.use(
    "/api/chat",
    chatRoutes
);

const server =
    http.createServer(app);

const io =
    new Server(server, {
        cors: {
            origin: "*",
        },
    });

socketHandler(io);

server.listen(
    process.env.PORT,
    () => {
        console.log(
            `Server Running on ${process.env.PORT}`
        );
    }
);