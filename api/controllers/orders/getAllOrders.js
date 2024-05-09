import pool from "../../db/connection.js";

export const getAllOrders = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    if (userId) {
      const getOrdersByUser = await pool.query(
        `SELECT o.id AS order_id, o.status AS order_status, o.created_at AS order_date,
        p.name AS product_name, p.price AS product_price, p.img_path AS product_image, p.id AS product_id
        FROM orders o
        JOIN products p ON o.product = p.id
        WHERE o.buyer = $1
        ORDER BY order_date DESC;`,
        [userId]
      );
      if (getOrdersByUser.rows) {
        return res.status(200).send(getOrdersByUser.rows);
      }
    } else {
      res.status(400).send("No id");
    }
  } catch (error) {
    console.log(error);
  }
};
