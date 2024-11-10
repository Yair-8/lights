import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  title: {
    type: String,
    required: [true, "Type is required"],
    minlength: [3, "Type must be at least 3 characters long"],
    maxlength: [10, "Type must be not more than 10 characters long"],
    trim: true,
  },
});

const Type = mongoose.model("Type", userSchema);
export default Type;
