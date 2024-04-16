import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import pool from "./db/connection.js";
import { v4 as uuidv4 } from "uuid";
import morgan, { token } from "morgan";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const SECRET_KEY = "lhbubwdnjoiwjnj";

//middlewares
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("images"));
app.use(morgan("dev"));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    console.log(req.body.image);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//user middleware

const generateToken = (user) => {
  return jwt.sign(
    { id: user.rows[0].id, email: user.rows[0].email },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

const saveUser = async (req, res, next) => {
  try {
    const username = await pool.query(
      `SELECT * FROM public.user WHERE username ILIKE $1`,
      [req.body.userName]
    );

    if (username) {
      return res.status(409).send("username already taken");
    }

    const emailCheck = await pool.query(
      `SELECT * FROM public.user WHERE email ILIKE $1`,
      [req.body.email]
    );

    if (emailCheck) {
      return res.status(409).send("email already taken");
    }
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const userFind = await pool.query(
      `SELECT * FROM public.user WHERE username = $1`,
      [data.userName]
    );

    if (userFind) {
      return res.status(400).send("Username, already taken");
    } else {
      const user = await pool.query(
        `INSERT INTO public.user (id, username, email, password)
        VALUES(
          $1, $2, $3, $4
          )
          RETURNING *
        `,
        [uuidv4(), data.userName, data.email, data.password]
      );

      res.send("user registred successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(req.body);
    const user = await pool.query(
      `SELECT * FROM public.user WHERE email ILIKE $1`,
      [email]
    );

    if (user) {
      const isSame = await bcrypt.compare(password, user.rows[0].password);
      if (isSame) {
        const token = jwt.sign({ id: user.rows[0].id }, SECRET_KEY);
        //send user data

        return res.status(201).send(token);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

//endpoints image
app.post("/", upload.single("image"), async (req, res) => {
  const { filename, path, mimetype, size } = req.file;

  const insertIntoDb = await pool.query(
    `
  INSERT INTO public.products (
    id,
    name ,
    img ,
    mimetype,
    size
  )
  VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [uuidv4(), filename, path, mimetype, size]
  );

  res.send(insertIntoDb.rows);
});
app.get("/image/:filename", async (req, res) => {
  const { filename } = req.params;
  const getFromDb = await pool.query(
    `
      SELECT * FROM public.products where img ILIKE $1;
  `,
    [`images/${filename}`]
  );

  res.send(getFromDb.rows);
});
app.get("/all", async (req, res) => {
  const getFromDb = await pool.query(
    `
      SELECT * FROM public.products;
  `
  );

  res.send(getFromDb.rows);
});

//user endpoints

app.post("/signup", signUp);
app.post("/login", login);

//server
app.listen(5010, () => {
  console.log("Server started");
});
