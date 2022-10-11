const mysql = require('mysql')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const mysqlConnection = mysql.createConnection({
    host:"localhost",
    user: 'root',
    password: 'AyobamI008@',
    database: "EmployeeDB"
});
//console.log(mysqlConnection)
  mysqlConnection.connect((err) => {
    if(!err)
        console.log("Db connected successfully");
        else
        console.log("Db connection failed")
    
  })

  app.listen(3000, ()=> console.log("Server is running on port 3000"))

  app.get('/employees',(req, res)=>{
    mysqlConnection.query
    ('SELECT * FROM Employee',(err, rows, fields)=>{
        if(!err)
      res.send(rows )
        else
        console.log(err)
   } )
  })
  app.get('/employees/:id',(req, res)=>{
    mysqlConnection.query
    ('SELECT * FROM Employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
      res.send(rows )
        else
        console.log(err)
   } )
  })