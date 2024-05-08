import pool from "../../db/connection.js";

let databaseInitialized = false;

export const initializeUserDb = async (req, res, next) => {
  try {
    if (
      req.originalUrl === "/user/signup" &&
      req.method === "POST" &&
      !databaseInitialized
    ) {
      const res = await pool.query(
        `CREATE TABLE IF NOT EXISTS users(
        id uuid PRIMARY KEY,
        username varchar NOT NULL,
        email varchar NOT NULL, 
        password varchar NOT NULL
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
