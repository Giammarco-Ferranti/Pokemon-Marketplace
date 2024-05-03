import pool from "../../db/connection.js";

export const searchProduct = async (req, res) => {
  const { q } = req.query;
  try {
    const getProductsByQuery = await pool.query(
      `SELECT * 
      FROM products 
      WHERE name ILIKE $1
      LIMIT 5;`,
      [`%${q}%`]
    );
    if (getProductsByQuery.rows) {
      return res.status(200).send(getProductsByQuery.rows);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
