import Type from "./Type.mjs";

class TypesDBService {
  static async getList() {
    try {
      const res = await Type.find({}).exec();
      console.log("================TYPE");
      console.log(res);
      return res;
    } catch (error) {
      console.error("Error fetching types:", error);
      return [];
    }
  }
}
export default TypesDBService;
