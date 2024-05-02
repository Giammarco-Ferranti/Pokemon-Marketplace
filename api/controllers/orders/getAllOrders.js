import pool from "../../db/connection.js";

export const getAllOrders = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const getOrdersByUser = await pool.query(
      `SELECT o.id AS order_id, o.status AS order_status, o.created_at AS order_date,
      p.name AS product_name, p.price AS product_price, p.img_path AS product_image
      FROM orders o
      JOIN products p ON o.product = p.id
      WHERE o.buyer = $1
      ORDER BY order_date DESC;`,
      [userId]
    );
    if (getOrdersByUser.rows.length > 0) {
      return res.status(200).send(getOrdersByUser.rows);
    } else {
      return res.status(400).send("No orders");
    }
  } catch (error) {
    console.log(error);
  }
};
