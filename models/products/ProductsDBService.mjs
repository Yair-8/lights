import Product from "./Product.mjs";

class ProductsDBService {
  static async getList() {
    try {
      const exists = await Product.checkCollectionExists();
      if (exists) {
        const data = await Product.find().exec();
        return data ?? [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  static async create(data) {
    try {
      const product = new Product(data);
      return await product.save();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  static async getById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      console.error("Error finding product by id:", error);
    }
  }
  static async getByFilename(filename) {
    try {
      return await Product.findOne({ image: filename });
    } catch (error) {
      console.error("Error finding product by filename:", err);
      throw err;
    }
  }
  static async update(id, data) {
    try {
      return await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }
  static async deleteById(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
}
export default ProductsDBService;
