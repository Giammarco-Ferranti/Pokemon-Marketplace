import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import pool from "./db/connection.js";
import { v4 as uuidv4 } from "uuid";
import morgan from "morgan";

//middlewares
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("images"));
app.use(morgan("dev"));

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

//endpoints
app.post("/", upload.single("image"), async (req, res) => {
  const { filename, path, mimetype, size } = req.file;
  //console.log(req.file);
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
  //console.log(filename);
  // const dirname = path.resolve();
  // const fullfilepath = path.join(dirname, "images/" + filename);
  // console.log(fullfilepath);
  //return res.sendFile(fullfilepath);
  const getFromDb = await pool.query(
    `
      SELECT * FROM public.products where img ILIKE $1;
  `,
    [`images/${filename}`]
  );

  res.send(getFromDb.rows);
});
app.get("/all", async (req, res) => {
  //console.log(filename);
  // const dirname = path.resolve();
  // const fullfilepath = path.join(dirname, "images/" + filename);
  // console.log(fullfilepath);
  //return res.sendFile(fullfilepath);
  const getFromDb = await pool.query(
    `
      SELECT * FROM public.products;
  `
  );

  res.send(getFromDb.rows);
});

app.listen(5010, () => {
  console.log("Server started");
});
