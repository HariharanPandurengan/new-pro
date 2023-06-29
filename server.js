const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"2892",
    database:"signup"
})

db.connect();

app.post('/signup',(req,res)=>{
    const sql = "INSERT INTO logind(username,password) VALUES (?)";
    const {username,password} = req.body;

    const values = [username,password];

    console.log(values);

    db.query(sql,[values],(err,data)=>{
        if(err){
            console.error(err)
            return res.sendStatus(500)
        }
        else{
            console.log("data inserted successfully")
            return res.sendStatus(200);
        }
    })
})

app.get('/signup', (req, res) => {
    const query = 'SELECT * FROM logind';
  
    // Execute the query
    db.query(query, (error, results) => {
      if (error) throw error;
  
      // Return the fetched data
      res.json(results);
      console.log()
    });
  });

app.listen(8095,()=>{
    console.log("listing");
})