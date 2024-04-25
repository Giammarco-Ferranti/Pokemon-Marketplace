import pool from "../../db/connection.js";

export const getAllProducts = async (req, res) => {
  const getFromDb = await pool.query(
    `
      SELECT * FROM public.products;
  `
  );

  res.send(getFromDb.rows);
};
