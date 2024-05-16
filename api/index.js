import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoute from "../api/routes/user.js";
import ordersRoute from "../api/routes/orders.js";
import productRoute from "../api/routes/product.js";
import { initializeOrdersDb } from "./middlewares/Db-Initialize/OrdersInit.js";
import { initializeUserDb } from "./middlewares/Db-Initialize/UserInit.js";
import { initializeProductsDb } from "./middlewares/Db-Initialize/ProductsInit.js";

//middlewares
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("images"));
app.use(morgan("dev"));
app.use(cookieParser());
// app.use(initializeOrdersDb);
// app.use(initializeUserDb);
// app.use(initializeProductsDb);

//endpoints image
app.use("/product", productRoute);
app.use("/order", ordersRoute);
app.use("/user", userRoute);

//basic route
app.get("/", (req, res) => {
  res.send("Hello, use /product, /order, /user routes");
});

//server
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
