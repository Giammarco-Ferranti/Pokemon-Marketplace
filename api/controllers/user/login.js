import pool from "../../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "lhbubwdnjoiwjnj";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(req.body);
    const user = await pool.query(`SELECT * FROM users WHERE email ILIKE $1`, [
      email,
    ]);

    if (user) {
      const isSame = await bcrypt.compare(password, user.rows[0].password);
      if (isSame) {
        const token = jwt.sign({ id: user.rows[0].id }, SECRET_KEY, {
          expiresIn: 30,
        });
        //send user data
        const response = {
          token: token,
          user: user,
        };

        return res.status(200).send(response);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
