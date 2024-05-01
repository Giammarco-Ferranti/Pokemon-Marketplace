import pool from "../../db/connection.js";
import { v4 as uuidv4 } from "uuid";

export const uploadProduct = async (req, res) => {
  const { filename } = req.file;
  const { id, name, price, description, rarity } = req.body;
  console.log(req.body, filename);
  try {
    const userExist = await pool.query(
      "SELECT EXISTS(SELECT 1 FROM users WHERE id = $1)",
      [id]
    );
    console.log(userExist.rows[0].exists);

    if (userExist.rows[0].exists) {
      const insertIntoDb = await pool.query(
        `
      INSERT INTO products 
      (id, name, owner, price, description, created_at, img_path, rarity)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6, $7) RETURNING *
    `,
        [uuidv4(), name, id, price, description, filename, rarity]
      );

      res.status(200).send(insertIntoDb.rows);
    } else {
      res.status(400).send("User not logged in");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
