const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const userRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/auth', authRouter);
server.use('/user', authenticate, userRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "it's working! IT'S WORKING!"});
});

module.exports = server;
