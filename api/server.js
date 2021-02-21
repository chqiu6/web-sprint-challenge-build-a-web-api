const express = require('express');
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json());
server.use("/actions", actionsRouter);
server.use("/projects",projectsRouter);

server.get("/", (req, res) => {
    res.send(`<h1>web api sprint challenge</h1>`);
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message : "Something went wrong !",
    });
});

module.exports = server;
