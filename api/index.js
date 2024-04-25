import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoute from "../api/routes/user.js";
import ordersRoute from "../api/routes/orders.js";
import productRoute from "../api/routes/product.js";

//middlewares
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("images"));
app.use(morgan("dev"));
app.use(cookieParser());

//endpoints image
app.use("/product", productRoute);
app.use("/order", ordersRoute);
app.use("/user", userRoute);

//server
app.listen(5010, () => {
  console.log("Server started");
});
