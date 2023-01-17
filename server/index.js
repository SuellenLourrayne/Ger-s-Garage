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
    else if (result.length > 0) {res.send(result),console.log(result)}
    else {console.log("wrong email or password");res.send({message: "Wrong email or password"})};
  });
});

//get staff/client users
app.post('/api/Users', (req, res)=> {
  const idUser = req.body.idUser;
  const idUserTrust = req.body.idUserTrust;
  //console.log(idUser+","+idUserTrust);

  let sqlSelect = "SELECT * FROM users WHERE ";
  let count = 0;

  if(idUser !== "") {
    sqlSelect += "idUser = '"+ idUser +"'";
    count++;
  }
  if(idUserTrust !== "") {
    if(count>0) sqlSelect += " AND ";
    sqlSelect += "idUserTrust = '"+ idUserTrust +"'";
  }
  //console.log(sqlSelect);

  db.query(sqlSelect, [idUserTrust], (err, result)=> {
    if (err) {console.log(err)}
    else if (result.length > 0) {res.send(result)}
    else {console.log("No user found.");res.send({message: "There is no one registered."})};
  });
});

//update user
app.post('/api/UpdateUser', (req, res)=> {
  const idUser = req.body.idUser;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  console.log(idUser+","+name+","+email+","+phone+","+password);

  let sqlUpdate = "UPDATE users SET ";
  let count = 0;

  if(name !== "") {
    sqlUpdate += "name = '"+ name +"'";
    count++;
  }
  if(email !== "") {
    if(count>0) sqlUpdate += ", ";
    sqlUpdate += "email = '"+ email +"'";
    count++;
  }
  if(phone !== "") {
    if(count>0) sqlUpdate += ", ";
    sqlUpdate += "phone = '"+ phone +"'";
  }
  if(password !== "") {
    if(count>0) sqlUpdate += ", ";
    sqlUpdate += "password = '"+ password +"'";
  }

  sqlUpdate += " WHERE users.idUser = ?";
  
  console.log(sqlUpdate);
  
  db.query(sqlUpdate, [idUser], (err, result)=> {
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

  console.log(description+","+cost+", "+sellPrice+","+qtd);

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

  console.log(idItem+","+description+","+cost+","+sellPrice+","+qtd);

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

//get bookings
app.post('/api/Bookings', (req, res)=> {
  const idUser = req.body.idUser;
  const idUserTrust = req.body.idUserTrust;
  const idStaff= req.body.idStaff;
  console.log(idUser+","+idUserTrust+","+idStaff);

  let sqlSelect = " SELECT "
  + " bookings.idClient, bookings.idBooking, u.name, DATE_FORMAT(bookings.date, '%D %M %Y') AS date, bookings.time, bt.description AS bookingType, v.license, status.description AS status, "
  + " bookings.coments, t.description AS vehicle, e.description AS engine, b.description AS brand, u.idUserTrust, bookings.idStaff, s.name AS staffName "
  + " FROM bookings "
  + " INNER JOIN users AS u ON bookings.idClient = u.idUser "
  + " INNER JOIN users AS s ON bookings.idStaff = s.idUser "
  + " INNER JOIN vehicledetails AS v ON bookings.idVehicleDetail = v.idVehicleDetail "
  + " INNER JOIN vehicletypes AS t ON v.idVehicleType = t.idVehicleType "
  + " INNER JOIN enginetypes AS e ON v.idEngineType = e.idEngineType "
  + " INNER JOIN brands AS b ON v.idBrand = b.idBrand "
  + " INNER JOIN bookingtypes AS bt ON bt.idBookingType = bookings.idBookingType "
  + " INNER JOIN relationvehiclebookingtypes AS vb ON vb.idBookingType = bt.idBookingType AND vb.idVehicleType = t.idVehicleType"
  + " INNER JOIN bookingstatus AS status ON status.idBookingStatus = bookings.idBookingStatus ";
  let count = 0;

  if(idUserTrust == 3) {
    sqlSelect += "WHERE bookings.idClient = '"+ idUser +"'";
  }
  else if(idUserTrust == 2) {
    sqlSelect += "WHERE bookings.idStaff = '"+ idStaff +"'";
  }

  sqlSelect += " ORDER BY bookings.date";
  //console.log(sqlSelect);

  db.query(sqlSelect, [ ], (err, result)=> {
    if (err) {console.log(err)}
    else if (result.length > 0) {res.send(result),console.log(result)}
    else {console.log("No booking found.");res.send({message: "There is no booking registered."})};
  });
});

//update booking
app.post('/api/UpdateBooking', (req, res)=> {
  const idBooking = req.body.idBooking;
  const idBookingStatus = req.body.idBookingStatus;
  const idStaff = req.body.idStaff;

  console.log(idBooking+","+idBookingStatus+","+idStaff);

  let sqlUpdate = "UPDATE bookings SET ";
  let count = 0;

  if(idBookingStatus != "") {
    sqlUpdate += "idBookingStatus = "+idBookingStatus; 
    count++;
  }
  if(idStaff != "") {
    if(count>0) sqlInsert += ", ";
    sqlUpdate += "idStaff = "+idStaff;
    count++;
  }

  sqlUpdate += " WHERE idBooking = ?";
  
  console.log(sqlUpdate);
  
  db.query(sqlUpdate, [idBooking], (err, result)=> {
    console.log(result);
  });
});

//Insert new vehicle
app.post('/api/NewVehicle', (req, res)=> {
  
  const idUser = req.body.idUser;
  const vehicleName = req.body.vehicleName;
  const idType = req.body.idType;
  const idBrand = req.body.idBrand;
  const idEngineType = req.body.idEngineType;
  const license = req.body.license;

  console.log(idUser+","+vehicleName+","+idType+","+idBrand+","+idEngineType+","+license);

  const sqlInsert = "INSERT INTO vehicledetails(idUser, idVehicleType, idEngineType, idBrand, name, license) VALUES "
  +"(?, ?, ?, ?, ?, ?)";

  db.query(sqlInsert, [idUser, idType, idEngineType, idBrand, vehicleName, license], (err, result)=> {
    console.log(result);
  });
});

//get all brands
app.get('/api/Brands', (req, res)=> {

  const sqlSelect = "SELECT * FROM brands";
  console.log(sqlSelect);

  db.query(sqlSelect, [ ], (err, result)=> {
    if (err) {console.log(err)}
    else if (result.length > 0) {res.send(result)}
    else {console.log("No brand found.");res.send({message: "There is no brand registered."})};
  });
});

//get vehicles
app.post('/api/Vehicles', (req, res)=> {

  const idUser = req.body.idUser;

  const sqlSelect = "SELECT v.idVehicleDetail, v.idUser, t.description AS type, e.description AS engine, b.description AS brand, "
  + " v.name, v.license FROM vehicleDetails AS v "
  + " INNER JOIN vehicletypes AS t ON v.idVehicleType = t.idVehicleType "
  + " INNER JOIN enginetypes AS e ON v.idEngineType = e.idEngineType "
  + " INNER JOIN brands AS b ON v.idBrand = b.idBrand "
  + " WHERE idUser = ?";
  //console.log(sqlSelect);

  db.query(sqlSelect, [ idUser ], (err, result)=> {
    if (err) {console.log(err)}
    else if (result.length > 0) {res.send(result),console.log(result)}
    else {console.log("No vehicle found.");res.send({message: "There is no vehicle registered."})};
  });
});

//update vehicle
app.post('/api/UpdateVehicle', (req, res)=> {
  const idVehicleDetail = req.body.idVehicleDetail;
  const idVehicleType = req.body.idType;
  const idEngineType = req.body.idEngineType;
  const idBrand = req.body.idBrand;
  const name = req.body.vehicleName;
  const license = req.body.license;

  console.log(idVehicleDetail+","+idVehicleType+","+idEngineType+","+idBrand+","+name+","+license);

  let sqlUpdate = "UPDATE vehicleDetails SET ";
  let count = 0;

  if(idVehicleType != "") {
    sqlUpdate += "idVehicleType = "+idVehicleType; 
    count++;
  }
  if(idEngineType != "") {
    if(count>0) sqlUpdate += ", ";
    sqlUpdate += "idEngineType = "+idEngineType;
    count++;
  }
  if(idBrand != "") {
    if(count>0) sqlUpdate += ", ";
    sqlUpdate += "idBrand = "+idBrand;
    count++;
  }
  if(name != "") {
    if(count>0) sqlUpdate += ", ";
    sqlUpdate += "name = '"+name+"'";
    count++;
  }
  if(license != "") {
    if(count>0) sqlUpdate += ", ";
    sqlUpdate += "license = '"+license+"'";
    count++;
  }

  sqlUpdate += " WHERE idVehicleDetail = ?";
  
  console.log(sqlUpdate);
  
  db.query(sqlUpdate, [ idVehicleDetail ], (err, result)=> {
    console.log(result);
  });
});

//Insert new booking
app.post('/api/NewBooking', (req, res)=> {
  
  const idClient = req.body.idClient;
  const idVehicleDetail = req.body.idVehicleDetail;
  const idBookingType = req.body.idBookingType;
  const date = req.body.date;
  const time = req.body.time;
  let coments = req.body.coments;

  if(coments === "") coments = "No coments.";

  console.log(idClient+","+idVehicleDetail+","+idBookingType+","+date+","+time+","+coments);

  const sqlInsert = "INSERT INTO bookings(idClient, idVehicleDetail, idBookingType, date, time, coments) VALUES ( ?, ?, ?, ?, ?, ?)";
  console.log(sqlInsert);

  db.query(sqlInsert, [ idClient, idVehicleDetail, idBookingType, date, time, coments], (err, result)=> {
    console.log(result);
  });
});

//listen port
app.listen(PORT, () => {
  console.log("running on port 3002");
})
