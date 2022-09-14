import User from "../../Models/Users";
import bcrypt from "bcryptjs";
require("dotenv").config();
import mongoose from "mongoose";

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

  mongoose.set("useCreateIndex", true);

  const { fName, lName, email, password, company, address, dob } = req.body;

  try {
    if (
      !fName ||
      !lName ||
      !email.includes("@") ||
      !email.includes(".") ||
      !password
    ) {
      return res.status(422).json({ error: "Invalid Input" });
    }

    //Finding user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ error: "User Exists" });
    }

    //If user doesn't exists, save hashed password along with other data
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      fName,
      lName,
      email,
      password: hashedPassword,
      company,
      address,
      dob,
    });
    newUser.save();

    return res.status(200).json({ message: "User Created!" });
  } catch (err) {
    return res.status(422).json({ error: "Invalid Input" });
  }
};
