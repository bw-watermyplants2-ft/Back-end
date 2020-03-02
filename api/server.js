const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const userRouter = require("../users/users-router.js");
const plantsRouter = require('../plants/plants-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);
server.use('/users', authenticate, userRouter);
server.use('/plants', authenticate, plantsRouter);

server.get("/", (res, req) => {
    res.status(200).json({ api: "it's alive!"});
});

module.exports = server;
