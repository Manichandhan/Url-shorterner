const userModel = require("../models/userSchema");
const urlModel=require('../models/urlSchema')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { set } = require("mongoose");
require("dotenv").config();

const blackListtoken = new Set();
async function signup(req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const hashP = await bcrypt.hash(req.body.password, salt);

  try {
    const finddoc = await userModel.find({ email: req.body.email });
    if (finddoc != 0) {
      throw new Error("email already exist");
    }

    const doc = new userModel({
      email: req.body.email,
      password: hashP,
    });

    const saved = await doc.save();
    const payload = {
      email: saved.email,
      role: "user",
      id: saved._id,
      exp: Math.floor(Date.now() / 1000) + 1000 * 60 * 5,
    };
    const secretKey = process.env.secretKey;
    // const options={expiresIn:'5m'}
    const token = jwt.sign(payload, secretKey);
    res.cookie("token", token, { maxAge: 1000 * 60 * 5 });
    res.status(200).send({ message: "successful", user: saved });
  } catch (error) {
    res.status(400).send({ message: "Unsuccessfull", error: error.message });
  }
}
const signin = async (req, res, next) => {
  if (req.cookies.token) {
    if (blackListtoken.has(req.cookies.token)) {
      return next(new Error("please login again"));
    }
    const decode = jwt.decode(req.cookies.token);
    const time = Date.now() / 1000;
    if (decode.exp > time) {
      return next(new Error("already logged in"));
    }
  }

  if (req.body.email && req.body.password) {
    const userdoc = await userModel.find({ email: req.body.email });

    if (userdoc == 0) {
      return next(new Error("user not found"));
    }

    const result = await bcrypt.compare(req.body.password, userdoc[0].password);

    if (!result) {
      return next(new Error("password doesn't match"));
    }
    const payload = {
      role: "user",

      exp: Math.floor(Date.now() / 1000) + 1000 * 60 * 5,
    };
    const secretKey = process.env.secretKey;
    //const options = { expiresIn: "5m" };
    const token = jwt.sign(payload, secretKey);
    res.cookie("token", token, { maxAge: 1000 * 60 * 5 });
    res.status(200).send({ message: "login successful" });
  } else {
    next(new Error("enter email and password"));
  }
};
const signout = async (req, res, next) => {
  blackListtoken.add(req.cookies.token);
  res.clearCookie("token");
  res.status(200).send("successfully loged out");
};
const deleteDocs = async (req, res) => {
  const result = userModel.deleteMany({});
 const uriresult= await urlModel.deleteMany({})

  result
    .then((data) => {
      res.status(200).send({ message: "successful", usersDeleted: data,urlDeleted:uriresult });
    })
    .catch((err) => {
      res.status(400).send({ message: "unsuccessful", data: err });
    });
};
module.exports = { signup, deleteDocs, signin, signout };
