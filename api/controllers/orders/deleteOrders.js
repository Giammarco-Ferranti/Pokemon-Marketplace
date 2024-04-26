import pool from "../../db/connection.js";

export const deleteOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const checkStatus = await pool.query(
      `SELECT status FROM orders WHERE id = $1`,
      [orderId]
    );

    if (checkStatus.rows[0].status === "shipped") {
      const deleteOrder = await pool.query(
        `
          DELETE FROM orders
          WHERE id = $1
          RETURNING *;
      `,
        [orderId]
      );

      if (deleteOrder) {
        return res.status(200).send("Order deleted");
      } else {
        return res.status(400).send("Couldn't delete the order");
      }
    } else if (checkStatus.rows[0].status === "delivered") {
      return res.status(400).send("Order already delivered");
    }
  } catch (error) {
    return res.statu(500).send(error);
  }
};
