import pool from "../../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const SECRET_KEY = "lhbubwdnjoiwjnj";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const userFind = await pool.query(
      `SELECT * FROM public.users WHERE username ILIKE $1`,
      [data.username]
    );

    if (userFind.rows.length > 0) {
      return res.status(400).send("Username, already taken");
    } else {
      const user = await pool.query(
        `INSERT INTO public.users (id, username, email, password)
        VALUES(
          $1, $2, $3, $4
          )
          RETURNING *
        `,
        [uuidv4(), data.username, data.email, data.password]
      );
      const token = jwt.sign({ id: user.rows[0].id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.send(token);
    }
  } catch (error) {
    console.log(error);
  }
};
