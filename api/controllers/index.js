//user
export { getBestUsers } from "../controllers/user/getBestUsers.js";
export { signUp } from "../controllers/user/signUp.js";
export { login } from "../controllers/user/login.js";

//product
export { deleteProduct } from "../controllers/products/deleteProduct.js";
export { getAllProducts } from "../controllers/products/getAllProducts.js";
export { getMostPricy } from "../controllers/products/getMostPricy.js";
export { getProduct } from "../controllers/products/getProduct.js";
export { getProductsByUser } from "../controllers/products/getProductsByUser.js";
export { searchProduct } from "../controllers/products/searchProduct.js";
export { updateProduct } from "../controllers/products/updateProduct.js";
export { uploadProduct } from "../controllers/products/uploadProduct.js";

//orders
export { createOrder } from "../controllers/orders/createOrder.js";
export { deleteOrder } from "../controllers/orders/deleteOrders.js";
export { getAllOrders } from "../controllers/orders/getAllOrders.js";
export { updateStatus } from "../controllers/orders/updateStatus.js";
