const express = require('express');
const db = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const  PORT = 3002;

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

//register new user
app.post('/api/Register', (req, res)=> {
  
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const idUserTrust = req.body.idUserTrust;

  const sqlInsert = "INSERT INTO users (idUserTrust, name, email, phone, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sqlInsert, [idUserTrust,name, email, phone, password], (err, result)=> {
    console.log(result);
  });
});

//verify login
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

//get all staff users
app.get('/api/Staff', (req, res)=> {
  const sqlSelect = "SELECT * FROM users WHERE idUserTrust = 2";
  db.query(sqlSelect, [], (err, result)=> {
    if (err) {console.log(err)}
    else if (result.length > 0) {res.send(result),console.log(result)}
    else {console.log("No staff found.");res.send({message: "There is no staff registered."})};
  });
});

//get all client users
app.get('/api/Client', (req, res)=> {
  const sqlSelect = "SELECT * FROM users WHERE idUserTrust = 3";
  db.query(sqlSelect, [], (err, result)=> {
    if (err) {console.log(err)}
    else if (result.length > 0) {res.send(result),console.log(result)}
    else {console.log("No client found.");res.send({message: "There is no client registered."})};
  });
});

//update user
app.post('/api/UpdateUser', (req, res)=> {
  const idUser = req.body.idUser;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  console.log(idUser+" - "+name+" - "+email+" - "+phone);

  let sqlInsert = "UPDATE users SET ";
  let qtd = 0;

  if(name !== "") {
    sqlInsert += "name = '"+ name +"'";
    qtd++;
  }
  if(email !== "") {
    if(qtd>0) sqlInsert += ", ";
    sqlInsert += "email = '"+ email +"'";
    qtd++;
  }
  if(phone !== "") {
    if(qtd>0) sqlInsert += ", ";
    sqlInsert += "phone = '"+ phone +"'";
  }

  sqlInsert += " WHERE users.idUser = ?";
  
  console.log(sqlInsert);
  
  db.query(sqlInsert, [idUser], (err, result)=> {
    console.log(result);
  });
});

//listen port
app.listen(PORT, () => {
  console.log("running on port 3002");
})
