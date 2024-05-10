import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: "",
  port: process.env.DB_PORT,
});

export default pool;
