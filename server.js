const express = require("express");
const mysql = require("mysql");

const itemRouter = require("./routes/item");
const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "react",
  port: "3306"
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/item", itemRouter);
app.get("/", (req, res) => {
  con.query(`SELECT * FROM todolist`, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: false });
    } else {
      console.log(req.body);
      res.json({ message: true, result });
    }
  });
});

app.listen(8080, () => {
  console.log("Listening server on 8080...!");
});
