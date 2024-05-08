import pool from "../../db/connection.js";

export const getBestUsers = async (req, res) => {
  try {
    const getUsers = await pool.query(
      `SELECT u.id AS user_id, u.username AS user_name ,SUM(p.price) AS total_price 
      FROM users u
      JOIN products p ON u.id = p.owner 
      WHERE p.status = 'sold'
      GROUP BY u.id
      ORDER BY total_price DESC 
      LIMIT 100`
    );

    if (getBestUsers) {
      return res.status(200).send(getUsers.rows);
    } else {
      res.status(400).send("No users");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
