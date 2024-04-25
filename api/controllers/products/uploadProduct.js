import pool from "../../db/connection.js";
import { v4 as uuidv4 } from "uuid";

export const uploadProduct = async (req, res) => {
  const { filename, path } = req.file;
  const { id, name, price, description } = req.body;

  const userExist = await pool.query(
    "SELECT EXISTS(SELECT 1 FROM users WHERE id = $1)",
    [id]
  );

  // console.log(userExist.rows[0]);
  if (userExist.rows[0].exists) {
    const insertIntoDb = await pool.query(
      `
    INSERT INTO public.products 
    (id, name, owner, price, description, created_at, img_path)
    VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6) RETURNING *
  `,
      [uuidv4(), name, id, price, description, filename]
    );

    res.send(insertIntoDb.rows);
  }
};
