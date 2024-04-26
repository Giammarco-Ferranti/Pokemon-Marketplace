import pool from "../../db/connection.js";

export const updateStatus = async (req, res) => {
  const { orderId, value } = req.body;
  try {
    const updateStatusOrder = await pool.query(
      `
    UPDATE orders 
    SET status = $1
    WHERE id = $2
    RETURNING status;
`,
      [value, orderId]
    );

    if (updateStatusOrder) {
      return res.status(200).send(updateStatusOrder.rows);
    } else {
      return res.status(400).send("Couldn't update the order");
    }
  } catch (error) {
    return res.statu(500).send(error);
  }
};
