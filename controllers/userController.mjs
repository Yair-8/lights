import UsersDBService from "../models/user/UsersDBService.mjs";
import TypesDBService from "../models/type/TypeDBService.mjs";
import { validationResult } from "express-validator";

class UserController {
  static async usersList(req, res) {
    try {
      const dataList = await UsersDBService.getList();
      console.log("=========dataList");
      console.log(dataList);
      res.render("users/usersList", {
        users: dataList,
        title: "Users List",
      });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
  static async registerForm(req, res) {
    try {
      const id = req.params.id;
      let user = null;
      if (id) {
        //отримати об"єкт за id
        user = await UsersDBService.getById(id);
      }
      const types = await TypesDBService.getList();
      console.log("===>>> types");
      console.log(types);

      //відредерити сторінку з формою
      res.render("users/userRegister", {
        errors: [],
        data: user,
        types,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async registerUser(req, res) {
    // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
    const errors = validationResult(req);
    const data = req.body;
    const types = await TypesDBService.getList();

    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("users/userRegister", {
        errors: errors.array(),
        data,
        types,
      });
    }
    try {
      const { email, password, name, type } = req.body;
      console.log("====>>> req.body");
      console.log(req.body);
      if (req.params.id) {
        // Оновлюємо дані про користувача в базі даних
        await UsersDBService.update(req.params.id, {
          email,
          password,
          name,
          type,
        });
      } else {
        // Додаємо користувача в базу даних
        await UsersDBService.create({ email, password, name, type });
      }
      res.redirect("/users");
    } catch (err) {
      res.status(500).render("users/userRegister", {
        errors: [{ msg: err.message }],
        data,
        type,
      });
    }
  }
  static async deleteUser(req, res) {
    try {
      await UsersDBService.deleteById(req.body.id);
      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete user" });
    }
  }
}
export default UserController;
