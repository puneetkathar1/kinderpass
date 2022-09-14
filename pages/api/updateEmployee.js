require("dotenv").config();
import mongoose from "mongoose";
import User from "../../Models/Users";

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
  const {
    managerEmail,
    empId,
    fName,
    lName,
    email,
    address,
    dob,
    mobile,
    city,
  } = req.body;

  try {
    //Find User
    const user = await User.findOne({ email: managerEmail });

    if (user) {
      //If empId doesn't exists in employees array, push it
      if (user.employees.length == Number(empId) - 1) {
        user.employees.push({
          empId,
          fName,
          lName,
          email,
          address,
          dob,
          mobile,
          city,
        });

        user.save();
      } else {
        //If empId exists in employees array, update rest of the fields
        await User.updateOne(
          { email: managerEmail, "employees.empId": empId },
          {
            $set: {
              "employees.$.fName": fName,
              "employees.$.lName": lName,
              "employees.$.email": email,
              "employees.$.address": address,
              "employees.$.dob": dob,
              "employees.$.mobile": mobile,
              "employees.$.city": city,
            },
          }
        );
      }

      return res.status(200).json({ error: "Employee Added." });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errer: "Something went wrong." });
  }
};
