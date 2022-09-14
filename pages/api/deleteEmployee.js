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

  const { managerEmail, empId } = req.body;

  try {
    const user = await User.findOne({ email: managerEmail });

    //Pop if user exists
    if (user) {
      user.employees.pop([Number(empId) - 1]);
      user.save();
      return res.status(422).json({ error: "Employee Added." });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errer: "Something went wrong." });
  }
};
