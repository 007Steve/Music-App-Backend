const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

//Sign Up
router.post("/signup", async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    console.log(username);
    if (user)
      return res.status(400).send("User with that email already exist.");

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    user = new User({
      username: username,
      email: email,
      password: passwordHash,
    });
    await user.save();

    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({
        message: "success user created",
      });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
    const schema = Joi.object({
      email: Joi.string().min(3).max(200).email().required(),
      password: Joi.string().min(6).max(200).required(),
    });
    const { error } = schema.validate(req.body);
    const { email, password } = req.body;
    if (error) return res.status(400).send(error.details[0].message);
  
    try {
      let user = await User.findOne({ email });
  
      if (!user) return res.status(400).send("User does not exist.");
  
      const passwordCorrect = await bcrypt.compare(password, user.password);
  
      if (!passwordCorrect) return res.status(400).send("User does not exist.");
  
      const token = jwt.sign(
        { _id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET
      );
  
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .send({
          message: "success",
        });
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error.message);
    }
  });

  // Loggedin
router.get("/user", async (req, res) => {
    try {
      const cookie = req.cookies.token;
      const claims = jwt.verify(cookie, process.env.JWT_SECRET);
      if (!claims) {
        return res.status(401).send({
          message: "unauthenticated",
        });
      }
      const user = await User.findOne({ _id: claims._id });
      const { password, ...data } = await user.toJSON();
      res.send(data);
    } catch (error) {
      res.status(401).send(error.message);
      console.log(error.message);
    }
  });