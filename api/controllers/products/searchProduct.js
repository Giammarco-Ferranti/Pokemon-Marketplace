import pool from "../../db/connection.js";

export const searchProduct = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  try {
    const getProductsByQuery = await pool.query(
      `SELECT * 
      FROM products 
      WHERE status = 'Available'
      AND name ILIKE $1 
      LIMIT 5;`,
      [`%${q}%`]
    );
    if (getProductsByQuery.rows) {
      return res.status(200).send(getProductsByQuery.rows);
    } else {
      return res.status(400).send("No products");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
