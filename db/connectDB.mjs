import config from "../config/default.mjs";
// Імпортуємо необхідний модуль
import mongoose from "mongoose";

// Встановлюємо глобальні проміси
mongoose.Promise = global.Promise;

//Функція для підключення до MongoDB
// export default async function (databaseType = "users") {
//   try {
//     let mongoURI;
//     if (databaseType === "products") {
//       mongoURI = config.productsMongoURI;
//     } else {
//       mongoURI = config.mongoURI;
//     }
//     await mongoose.connect(config.mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Успішно підключено до MongoDB");
//   } catch (err) {
//     console.error("Помилка підключення до MongoDB:", err);
//   }
// }
export default async function () {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Успішно підключено до MongoDB");
  } catch (err) {
    console.error("Помилка підключення до MongoDB:", err);
  }
}
