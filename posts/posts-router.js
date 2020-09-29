const express = require("express");
const router = express.Router();
const Posts = require("../data/db");

router.get("/", (req, res) => {
  Posts.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const { body } = req;
  console.log(body, "<====");
  if (body.title && body.contents) {
    res.status(201).json({});
  }
});

module.exports = router;
