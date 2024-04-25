import pool from "../../db/connection.js";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req, res) => {
  const { productId, userId, status } = req.body;

  const postOrder = await pool.query(
    `
  INSERT INTO public.orders 
  (id, buyer, products, status, created_at)
  VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *
`,
    [uuidv4(), userId, [productId], status]
  );

  return res.send(postOrder.rows);
};
