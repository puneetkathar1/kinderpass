require("dotenv").config();
import mongoose from "mongoose";
import User from "../../Models/Users";

export default async (req, res) => {
  mongoose.connect(
    process.env.mongoDB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected To Mongo");
    }
  );

  const { email } = req.body;
  try {
    //Finding user details via managerEmail
    const user = await User.findOne({ email });
    return res.send(user.employees);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};
