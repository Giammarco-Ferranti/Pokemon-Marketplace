import pool from "../../db/connection.js";

export const getMostPricy = async (req, res) => {
  try {
    const getFromDb = await pool.query(
      "SELECT * FROM products WHERE status = 'Available' ORDER BY price DESC LIMIT 10;"
    );
    if (getFromDb.rows) {
      return res.status(200).send(getFromDb.rows);
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
