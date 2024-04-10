import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

//middlewares
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("images"));

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
app.post("/", upload.single("image"), function (req, res) {
  res.send(`Pokemon-Final-Project/api/${req.file.path}`);
  console.log(req.file);
});

app.listen(5010, () => {
  console.log("Server started");
});
