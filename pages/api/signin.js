import User from "../../Models/Users";
import bcrypt from "bcryptjs";
require("dotenv").config();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Cookies from "cookies";

export default async (req, res) => {
  mongoose.connect(
    process.env.mongoDB,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected To Mongo");
    }
  );

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Invalid Input" });
    }

    //Finding user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "No User Found" });
    }

    //Comparing hashed password with saved hashed password
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      console.log(user);
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      //Saving cookies for 7 days
      const cookies = new Cookies(req, res);

      cookies.set("token", token, {
        httpOnly: false,
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      });

      cookies.set("email", user.email, {
        httpOnly: false,
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      });
      res.status(201).json({ message: user.email });
    } else {
      return res.status(401).json({ error: "Invalid Input" });
    }
  } catch (err) {
    console.log(err);
  }
};
