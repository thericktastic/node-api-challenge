const express = require("express");

const projectRouter = require("./data/helpers/projectRouter");
const actionRouter = require("./data/helpers/actionRouter");

const server = express();

// Global Middleware
server.use(express.json());
server.use(logger);

server.get("/", (request, response) => {
  response.send(`<h2>Let's crush this sprint</h2>`);
});

// Routes / Endpoints
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

// Custom middleware
function logger(request, response, next) {
  console.log(
    `${new Date().toISOString()} - ${request.method} request to ${
      request.originalUrl
    }`
  );
  next();
}

module.exports = server;
