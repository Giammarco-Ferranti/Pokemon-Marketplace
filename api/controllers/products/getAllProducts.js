import pool from "../../db/connection.js";

export const getAllProducts = async (req, res) => {
  try {
    const getFromDb = await pool.query(
      `
        SELECT * FROM products LIMIT 100;
    `
    );

    if (getFromDb.rows) {
      return res.status(200).send(getFromDb.rows);
    } else {
      return res.status(400).send("No products");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
