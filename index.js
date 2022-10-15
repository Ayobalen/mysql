const mysql = require('mysql')
const express = require('express')
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const mysqlConnection = mysql.createConnection({
    host:"localhost",
    user: 'root',
    password: 'AyobamI008@',
    database: "EmployeeDB",
    multipleStatements: true
});
//console.log(mysqlConnection)
  mysqlConnection.connect((err) => {
    if(!err)
        console.log("Db connected successfully");
        else
        console.log("Db connection failed")
    
  })

  app.listen(3000, ()=> console.log("Server is running on port 3000"))
// get all employee
  app.get('/employees',(req, res)=>{
    mysqlConnection.query
    ('SELECT * FROM Employee',(err, rows, fields)=>{
        if(!err)
      res.send(rows )
        else
        console.log(err)
   } )
  })
  // Get an employee
  app.get('/employees/:id',(req, res)=>{
    mysqlConnection.query
    ('SELECT * FROM Employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
      res.send(rows)
        else
        console.log(err)
   } )
  })
 //Delete an employee
  app.delete('/employees/:id',(req, res)=>{
    mysqlConnection.query
    ('DELETE FROM Employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
      res.send("Deleted successfully")
        else
        console.log(err)
   } )
  })

  //Insert an employee
  app.post('/employees',(req, res)=>{
    let emp = req.body
    var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);"
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],(err, rows, fields)=>{
        if(!err)
      rows.forEach(element => {
         if(element.constructor === Array)
         res.send("Inserted employee id : "+element[0].EmpID)
      });
        else
        console.log(err)
   } )
  })

  //Update an employee
  app.put('/employees',(req, res)=>{
    let emp = req.body
    var sql = "SET @EmpID = ?; SET @Name = ?; SET @EmpCode = ?; SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);"
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],(err, rows, fields)=>{
        if(!err)
     res.send("Updated successfully")
        else
        console.log(err)
   } )
  })