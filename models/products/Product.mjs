import mongoose from "mongoose";
import config from "../../config/default.mjs";

const { Schema } = mongoose;
const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
    maxlength: [50, "Title must be at most 50 characters long"],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
    minlength: [3, "Brand must be at least 3 characters long"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    toInt: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Description must be at least 3 characters long"],
    maxlength: [500, "Description must be at most 500 characters long"],
    trim: true,
  },
});
productSchema.statics.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases();
  return databases.databases.some(
    (db) => db.name === config.productsDatabaseName
  );
};
productSchema.statics.checkCollectionExists = async function () {
  const collections = await mongoose.connection.db
    .listCollections({ name: "products" })
    .toArray();
  return collections.length > 0;
};

const Product = mongoose.model("Product", productSchema);
export default Product;
