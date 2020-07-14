const express = require ("express");
const { v1: uuidv1 } = require('uuid');
var path = require("path");
//require fs read write
const fs = require ("fs")

//app all refer to express
const app = express();

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({extended: true}));
//JSON parse
app.use(express.json());

//middleware that lets you reach index or css
//express doesnt know static address
app.use(express.static("public"));

// var notesData = fs.readFile('db/db.json', 'utf8', function (err, data) {
//   if (err) throw err;
//   // console.log(data.toString ('utf8'));
// })


app.get("/api/notes", (req, res) => { 
 fs.readFile('db/db.json', 'utf8', (err, data) =>{
 res.json(data.toString);
  console.log(data);
  })
  })


app.get("/api/notes:id", (req, res) => { 
  // console.log("this is the response" + res);
})


//post

app.post("/api/notes", (req,res) =>{
//add id to title and text of reqbody
const noteObj = req.body;
//adds property called id with no 3
//needs to be dynamic
//use package that generates random IDS announcements channel
//install uuid npm
//object needs ID
//make sure never delete two or more
 noteObj.id = uuidv1();
 //have to write a file / DB .json
noteObj.push(notes)



//  console.log("this is notes data" + notesData);
})


app.listen (PORT, () => {
    console.log(`app listening on port: ${PORT}`)
})
//app.delete code
app.delete("/api/notes:id", (req, res) => {

})

//HTML Routes
  
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// If no matching route is found default to home
app.get("*", (req, res)=> {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});