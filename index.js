const cors = require("cors");
const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  localhost: "localhost",
  password: "password123",
  database: "employeesystem",
});

db.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB Connected");
  }
});

app.get("/getEmployees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createEmployee", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const wage = req.body.wage;
  const position = req.body.position;

  db.query(
    "INSERT INTO employees (name, age, country, wage, position) VALUES (?, ?, ?, ?, ?)",
    [name, age, country, wage, position],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("New employee created");
      }
    }
  );
});

app.put("/updateEmployeeWage", (req, res) => {
  const id = req.body.id;
  const newWage = req.body.newWage;

  db.query(
    "UPDATE employees SET wage=? where id=?",
    [newWage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Employee ID : ${id}'s wage has been updated.`);
      }
    }
  );
});

app.delete("/deleteEmployee/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM employees where id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(`Employee ${id} has been deleted from database.`);
    }
  });
});

app.listen(3001, () => console.log("Server is running on port 3001"));
