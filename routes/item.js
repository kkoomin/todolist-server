const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "react",
  port: "3306"
});

router.post("/add", (req, res) => {
  con.query(
    `INSERT INTO todolist (text, \`key\`) VALUES ('${req.body.text}', ${req.body
      .key * 1})`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: false });
      } else {
        console.log(req.body);
        res.json({ message: true });
      }
    }
  );
});

router.post("/edit", (req, res) => {
  con.query(
    `UPDATE todolist SET text = '${req.body.text}' WHERE \`key\`=${req.body.key}`,
    (err, body) => {
      if (err) {
        console.log(err);
        res.json({ message: false });
      } else {
        console.log(req.body.key + " todo edited!");
        res.json({ message: true });
      }
    }
  );
});

router.post("/delete", (req, res) => {
  con.query(
    `DELETE FROM todolist WHERE \`key\`=${req.body.key}`,
    (err, body) => {
      if (err) {
        console.log(err);
        res.json({ message: false });
      } else {
        console.log(req.body.key + " todo deleted!");
        res.json({ message: true });
      }
    }
  );
});

module.exports = router;
