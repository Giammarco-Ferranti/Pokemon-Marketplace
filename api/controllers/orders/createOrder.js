import pool from "../../db/connection.js";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req, res) => {
  const { productId, userId, status } = req.body;
  try {
    const postOrder = await pool.query(
      `
    INSERT INTO orders 
    (id, buyer, product, status, created_at)
    VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *
  `,
      [uuidv4(), userId, productId, status]
    );

    if (postOrder) {
      const updateProductStatus = await pool.query(
        ` UPDATE products
        SET status = 'Sold'
        WHERE id = $1;`,
        [productId]
      );
      return res.status(200).send("Order Done");
    } else {
      return res.status(400).send("Something went wrong");
    }
  } catch (error) {
    return console.log(error);
  }
};
