import express from "express";
import ProductController from "../controllers/productController.mjs";
import ProductValidator from "../validators/productValidator.mjs";
import { checkSchema } from "express-validator";
import multer from "multer";

// Налаштовуємо місце збереження файлів та їх імена
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
const router = express.Router();
router.get("/", ProductController.productsList);
router.get("/productRegister/:id?", ProductController.registerForm);
router.post(
  "/productRegister/:id?",
  upload.single("prodImg"),
  checkSchema(ProductValidator.productSchema),
  ProductController.registerProduct
);
router.get("/:id", ProductController.productDetail);
router.delete("/", ProductController.deleteProduct);
export default router;
