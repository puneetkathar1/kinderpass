import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      sparse: true,
    },
    lName: {
      type: String,
      required: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      sparse: true,
    },
    company: {
      type: String,
      required: true,
      sparse: true,
    },
    address: {
      type: String,
      required: true,
      sparse: true,
    },
    dob: {
      type: String,
      required: true,
      sparse: true,
    },
    employees:{
        type: Array,
        sparse: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
