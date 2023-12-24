"use strict";

/*--------------------------------------*
BLOG APP
/*--------------------------------------*/

// Catch async-errors and send to errorHandler:
require("express-async-errors");
const passwordEncrypt=require('../helpers/passwordEncrypt')

const User = require("../models/userModel");

// ------------------------------------------
// User
// ------------------------------------------
module.exports = {
  list: async (req, res) => {
    const data = await req.getModelList(User);

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {
    const data = await User.create(req.body);

    res.status(201).send({
        error:false,
        userId:data._id,
        email:data.email,
        fistname:req.body.fistname,
        lastname:req.body.lastname,
        Token: "Token " + data?.password+passwordEncrypt(new Date),
    });
  },

  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await User.findOne({ _id: req.params.userId }),
    });
  },

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });

    if (data.deletedCount >= 1) {
      res.send({
        message: "Successfully deleted",
      });
    } else {
      res.send({
        message: "There is no recording to be deleted.",
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      // const user = await User.findOne({ email: email, password: passwordEncrypt(password) })
      // No need passwordEncrypt, because using "set" in model:
      const user = await User.findOne({ email: email, password: password });
      if (user) {
        // Set Session:
        res.status(200).send({
          user: {
            error:false,
            email: user.email,
            userId: user._id,
            Token: "Token " + user._id+passwordEncrypt(`${new Date}`),
          },
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not true.");
      }
    } else {
      res.errorStatusCode = 400;
      throw new Error("Email and Password are required.");
    }
  },

  logout: async (req, res) => {

    req.password = null;
    res.status(200).send({
      error: false,
      message: "Logout OK",
    });
  },
};
