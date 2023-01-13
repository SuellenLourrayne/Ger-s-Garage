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

//get staff/client users
app.post('/api/Users', (req, res)=> {
  const idUserTrust = req.body.idUserTrust;
  console.log(idUserTrust);

  const sqlSelect = "SELECT * FROM users WHERE idUserTrust = ?";
  console.log(sqlSelect);

  db.query(sqlSelect, [idUserTrust], (err, result)=> {
    if (err) {console.log(err)}
    else if (result.length > 0) {res.send(result),console.log(result)}
    else {console.log("No user found.");res.send({message: "There is no one registered."})};
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

//get all products
app.get('/api/Products', (req, res)=> {

  const sqlSelect = "SELECT * FROM itens";
  console.log(sqlSelect);

  db.query(sqlSelect, [ ], (err, result)=> {
    if (err) {console.log(err)}
    else if (result.length > 0) {res.send(result),console.log(result)}
    else {console.log("No produt found.");res.send({message: "There is no product registered."})};
  });
});

//Insert new product
app.post('/api/NewProduct', (req, res)=> {
  
  const description = req.body.description;
  const cost = req.body.cost;
  const sellPrice = req.body.sellPrice;
  const qtd = req.body.qtd;

  console.log(description+", "+cost+", "+sellPrice+", "+qtd);

  const sqlInsert = "INSERT INTO itens (description, cost, sellPrice, qtd) VALUES (?, ?, ?, ?)";

  db.query(sqlInsert, [description, cost, sellPrice, qtd], (err, result)=> {
    console.log(result);
  });
});

//update product
app.post('/api/UpdateProduct', (req, res)=> {
  const idItem = req.body.idItem;
  const description = req.body.description;
  const cost = req.body.cost;
  const sellPrice = req.body.sellPrice;
  const qtd = req.body.qtd;

  console.log(idItem+" - "+description+" - "+cost+" - "+sellPrice+" - "+qtd);

  let sqlInsert = "UPDATE itens SET ";
  let count = 0;

  if(description !== "") {
    sqlInsert += "description = '"+ description +"'";
    count++;
  }
  if(cost !== "") {
    if(count>0) sqlInsert += ", ";
    sqlInsert += "cost = '"+ cost +"'";
    count++;
  }
  if(sellPrice !== "") {
    if(count>0) sqlInsert += ", ";
    sqlInsert += "sellPrice = '"+ sellPrice +"'";
    count++;
  }
  if(qtd !== "") {
    if(count>0) sqlInsert += ", ";
    sqlInsert += "qtd = '"+ qtd +"'";
  }

  sqlInsert += " WHERE itens.idItem = ?";
  
  console.log(sqlInsert);
  
  db.query(sqlInsert, [idItem], (err, result)=> {
    console.log(result);
  });
});

//listen port
app.listen(PORT, () => {
  console.log("running on port 3002");
})
