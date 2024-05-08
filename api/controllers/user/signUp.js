import pool from "../../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { filterRequest } from "../../utils/filterRequest.js";
import "dotenv/config";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const filterData = filterRequest(req.body);
    if (filterData.length === 0) {
      return res.status(400).send("Request cannot be empty");
    }
    const data = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const userFind = await pool.query(
      `SELECT * FROM users WHERE username ILIKE $1 OR email ILIKE $2`,
      [data.username, data.email]
    );
    if (userFind.rows.length > 0) {
      return res.status(400).send("User, already taken");
    } else {
      const user = await pool.query(
        `INSERT INTO users (id, username, email, password)
          VALUES(
            $1, $2, $3, $4
            )
            RETURNING *
          `,
        [uuidv4(), data.username, data.email, data.password]
      );
      const token = jwt.sign(
        { id: user.rows[0].id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: 1800, //30 minutes
        }
      );

      const response = {
        token: token,
        user: user.rows[0],
      };

      res.status(200).send(response);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
