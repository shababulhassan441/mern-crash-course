import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: { type: String, required: [true, "Username is Required!"] },
  email: {
    type: String,
    required: [true, "Email is required !"],
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: { type: String, requied: [true, "Password is required"] },
});

export default mongoose.models.User || mongoose.model("User", userModel);
