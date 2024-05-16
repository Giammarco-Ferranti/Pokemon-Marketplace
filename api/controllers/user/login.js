import pool from "../../db/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    //console.log(req.body);
    const user = await pool.query(`SELECT * FROM users WHERE email ILIKE $1`, [
      email,
    ]);

    if (user.rows.length > 0) {
      const isSame = await bcrypt.compare(password, user.rows[0].password);
      if (isSame) {
        const token = jwt.sign(
          { id: user.rows[0].id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: 1800, //30 minutes
          }
        );
        //send user data
        const response = {
          token: token,
          user: user.rows[0],
        };

        return res.status(200).send(response);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(400).send("This user doesn't exits");
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
