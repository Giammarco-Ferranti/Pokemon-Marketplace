import pool from "../../db/connection.js";

export const getProduct = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  const getProduct = await pool.query("SELECT * FROM products WHERE id = $1", [
    productId,
  ]);

  return res.send(getProduct.rows);
};
