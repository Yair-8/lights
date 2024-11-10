import { body } from "express-validator";

class ProductValidator {
  static productValidationRules = [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("brand").not().isEmpty().withMessage("Brand is required"),
    body("price").not().isEmpty().withMessage("Price is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
  ];
  static productSchema = {
    title: {
      notEmpty: {
        errorMessage: "Title is required",
      },
      isLength: {
        options: { min: 3 },
        errorMessage: "Title must be at least 3 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
    brand: {
      notEmpty: {
        errorMessage: "Brand is required",
      },
      isLength: {
        options: { min: 3 },
        errorMessage: "Brand must be at least 3 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
    price: {
      notEmpty: {
        errorMessage: "Price is required",
      },
      toInt: true,
      trim: true, // Видаляє пробіли на початку і в кінці
    },
    description: {
      notEmpty: {
        errorMessage: "Description is required",
      },
      isLength: {
        options: { min: 10 },
        errorMessage: "Description must be not less than 10 characters",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
  };
}
export default ProductValidator;
