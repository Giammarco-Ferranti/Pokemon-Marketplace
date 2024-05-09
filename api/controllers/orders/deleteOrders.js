import pool from "../../db/connection.js";

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  console.log(productId);
  try {
    if (id && productId) {
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
        console.log(deleteOrder.rows);
        if (deleteOrder.rows) {
          const updateProductStatus = await pool.query(
            `UPDATE products SET status = 'Available' WHERE id = $1 RETURNING *`,
            [productId]
          );
          console.log(updateProductStatus.rows);
          if (updateProductStatus.rows) {
            return res.status(200).send("Order deleted");
          }
        } else {
          return res.status(400).send("Couldn't delete the order");
        }
      }
    } else {
      return res.status(400).send("Ids cannot be empty");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
