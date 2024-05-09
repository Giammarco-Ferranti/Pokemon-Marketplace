import pool from "../../db/connection.js";

export const getProductsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (userId) {
      const getAllUserProducts = await pool.query(
        `
        SELECT * 
        FROM products
        WHERE owner = $1
        ORDER BY created_at DESC;`,
        [userId]
      );
      if (getAllUserProducts.rows) {
        return res.status(200).send(getAllUserProducts.rows);
      }
    } else {
      res.status(400).send("No ids");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
