import pool from "../../db/connection.js";

let databaseInitialized = false;

export const initializeOrdersDb = async (req, res, next) => {
  try {
    if (
      req.originalUrl === "/order" &&
      req.method === "POST" &&
      !databaseInitialized
    ) {
      const res = await pool.query(
        `CREATE TABLE IF NOT EXISTS orders(
          id uuid PRIMARY KEY,
          buyer uuid REFERENCES users(id),
          product uuid REFERENCES products(id),
          status varchar,
          created_at timestamp
        )`
      );
      console.log(res);
      databaseInitialized = true;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
  next();
};
