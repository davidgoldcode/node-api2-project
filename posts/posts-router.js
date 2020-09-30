const express = require("express");
const router = express.Router();
const Posts = require("../data/db");

// get posts
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

// get post comments
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      post
        ? res.status(200).json(post)
        : res
            .status(404)
            .json({ message: "The post could not be found with that ID" });
    })
    .catch((err) => {
      res
        .statusCode(500)
        .json({ message: "The post information could not be retrieved" });
    });
});

// get post comments by id
router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((post) => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({ message: "Could not find comment w this ID" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved" });
    });
});

// make POST request to /api/posts
router.post("/", (req, res) => {
  if (!req.body.contents || !req.body.title) {
    return res.status(400).json({
      message: "Please provide title AND content for the post",
    });
  }

  Posts.insert(req.body)
    .then((post) => {
      res.status(201).json({ ...post });
    })
    .catch((err) => {
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

module.exports = router;
