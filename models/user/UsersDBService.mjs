import User from "./User.mjs";

class UsersDBService {
  static async getList() {
    try {
      const exists = await User.checkCollectionExists();
      if (exists) {
        const data = await User.find({}, { password: 0 }).exec();
        return data ?? [];
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }
  static async create(data) {
    try {
      const user = new User(data);
      return await user.save();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  static async getById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      console.error("Error finding user id:", error);
    }
  }
  static async update(id, data) {
    try {
      return await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }
  static async deleteById(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
}
export default UsersDBService;
