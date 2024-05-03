import pool from "../../db/connection.js";

export const getMostPricy = async (req, res) => {
  try {
    const getFromDb = await pool.query(
      "SELECT * FROM products ORDER BY price DESC LIMIT 5;"
    );
    if (getFromDb.rows) {
      return res.status(200).send(getFromDb.rows);
    } else {
      return res.status(400).send("No products");
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
