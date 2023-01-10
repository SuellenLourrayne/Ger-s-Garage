const express = require('express');
const db = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const  PORT = 3002;

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


app.post('/api/Login', (req, res)=> {
  const email = req.body.email;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sqlSelect, [email, password], (err, result)=> {
    if (err) {console.log(err)}
    else if (result.length > 0) {res.send(result)}
    else {console.log("wrong email or password");res.send({message: "Wrong email or password"})};
  });

});


app.post('/api/Register', (req, res)=> {
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  const sqlInsert = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";
  db.query(sqlInsert, [username, email, phone, password], (err, result)=> {
    console.log(result);
  });

});

app.listen(PORT, () => {
  console.log("running on port 3002");
})
