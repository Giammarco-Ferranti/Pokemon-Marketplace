import pool from "../../db/connection.js";

let databaseInitialized = false;

export const initializeProductsDb = async (req, res, next) => {
  console.log(req.originalUrl);
  try {
    if (
      req.originalUrl === "/product/products/upload/" &&
      req.method === "POST" &&
      !databaseInitialized
    ) {
      const res = await pool.query(
        `CREATE TABLE IF NOT EXISTS products(
          id uuid PRIMARY KEY,
          name varchar,
          owner uuid REFERENCES users(id),
          price numeric,
          description varchar,
          created_at timestamp,
          img_path varchar,
          rarity varchar,
          status varchar
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
