const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');
const Tweet = require("../../models/Tweet");
const validateTweetInput = require("../../validation/tweets");

router.get("/test", (req, res) => {
  res.json({ msg: "This is the tweet route" });
});

router.post("/", 
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        const { isValid, errors } = validateTweetInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const newTweet = new Tweet({
            user: req.user.id,
            text: req.body.text
        });

        newTweet
            .save()
            .then( tweet => res.json(tweet))
        
    }
)

router.get("/", (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then(tweets => res.json(tweets))
    .catch(err => res.status(404).json({ notweetsfound: "No tweets found" }));
});

router.get("/user/:user_id", (req, res) => {
  Tweet.find({ user: req.params.user_id })
    .then(tweets => res.json(tweets))
    .catch(err =>
      res.status(404).json({ notweetsfound: "No tweets found from that user" })
    );
});

module.exports = router;
