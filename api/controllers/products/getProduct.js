import pool from "../../db/connection.js";

export const getProduct = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  try {
    const getProduct = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [productId]
    );

    if (getProduct.rows[0]) {
      return res.status(200).send(getProduct.rows);
    } else {
      return res.status(400).send("Product not found");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
