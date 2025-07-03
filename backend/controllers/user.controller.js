import User from "../models/userModel";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields Required" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User Already Registered" });
  }
  try {
    const user = new User({ name, email, password });
    return res
      .status(201)
      .json({ success: true, data: user, messsage: "user Created" });
  } catch (error) {
    console.log("errror", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
