import pool from "../../db/connection.js";

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const checkStatus = await pool.query(
      `SELECT status FROM orders WHERE id = $1`,
      [id]
    );
    console.log(checkStatus.rows[0].status);

    if (checkStatus.rows[0].status === "Delivered") {
      return res.status(400).send("Order already delivered");
    } else if (checkStatus.rows[0].status === "Shipped") {
      const deleteOrder = await pool.query(
        `
          DELETE FROM orders
          WHERE id = $1
          RETURNING *;
      `,
        [id]
      );

      if (deleteOrder) {
        return res.status(200).send("Order deleted");
      } else {
        return res.status(400).send("Couldn't delete the order");
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
