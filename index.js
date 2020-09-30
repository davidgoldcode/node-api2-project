const express = require("express");

const postsRouter = require("./posts/posts-router.js");

const server = express();
server.use(express.json());

server.use("/api/posts", postsRouter);

server.use("/", (req, res) => {
  res.json({ message: "up & running" });
});

const port = 4000;
server.listen(port, () => {
  console.log("***Server Running on http://localhost:4000***");
});
