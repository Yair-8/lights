import dotenv from "dotenv";
dotenv.config();
export default Object.freeze({
  databaseName: process.env.DATABASE_NAME,
  productsDatabaseName: process.env.PRODUCTS_DATABASE_NAME,
  databaseUrl: process.env.MONGODB_URL,
  mongoURI: `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`,
  productsMongoURI: `${process.env.MONGODB_URL}${process.env.PRODUCTS_DATABASE_NAME}`,
  port: process.env.PORT,
});
