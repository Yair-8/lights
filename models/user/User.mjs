import mongoose from "mongoose";
import config from "../../config/default.mjs";

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [10, "Name must be not more than 10 characters long"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [10, "Password must be at most 10 characters long"],
    validate: {
      validator: function (v) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
          v
        );
      },
      message: (props) =>
        "Password must contain at least one letter, one number, and one special character",
    },
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: "Type",
  },
});
userSchema.statics.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases();
  return databases.databases.some((db) => db.name === config.databaseName);
};
userSchema.statics.checkCollectionExists = async function () {
  const collections = await mongoose.connection.db
    .listCollections({ name: "users" })
    .toArray();
  return collections.length > 0;
};

const User = mongoose.model("User", userSchema);
export default User;
