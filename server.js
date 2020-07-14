const express = require ("express");
const { v1: uuidv1 } = require('uuid');
var path = require("path");
//require fs read write
const fs = require ("fs")
//app all refer to express
const app = express();
const PORT = process.env.PORT || 3000;
//app.use binds middleware to the application
//extended is true so URL encoded data will be parsed with qs lib (parsing and stringifying lib with added sec)
app.use(express.urlencoded({extended: true}));
//middleware that parses JSON
app.use(express.json());
//middleware that lets you reach index or css
//express doesnt know static address
app.use(express.static("public"));

//function tells what to do when a get req at a given route is called
app.get("/api/notes", (req, res) => { 
//sets a variable for an fs read file which uses parse method to parse JSON string and construct object
var global_data = JSON.parse(fs.readFileSync("db/db.json"));
//sends a JSON response composed of specified data
res.json(global_data);
})

//routes HTTP POST req to speicified path using callback function
app.post("/api/notes", (req,res) =>{
//sets a variable for an fs read file which uses parse method to parse JSON string and construct object
var global_data = JSON.parse(fs.readFileSync("db/db.json"));
//sets a variable for JSON data in request
//can send arbitrary length JSON to server
const noteObj = req.body;
//sets a unique ID
noteObj.id = uuidv1();
//pushes JSON post data into the main JSON file
global_data.push(noteObj);
//rewrites the file to include new data
fs.writeFileSync("db/db.json", JSON.stringify(global_data));
//sends JSON response of specified data
res.json(global_data)

})

//app.delete code
app.delete("/api/notes/:id", (req, res) => {
var global_data = JSON.parse(fs.readFileSync("db/db.json"));
var id = JSON.stringify(req.params.id);
const remainNotes = [];

for (i = 0; i < global_data.length; i ++){
  if (JSON.stringify(global_data[i].id) != id){
    console.log("not the same")
    remainNotes.push(global_data[i]);
  }
}
console.log("remain notes" + remainNotes)

fs.writeFileSync("db/db.json", JSON.stringify(remainNotes));
res.send(remainNotes);

})

//HTML Routes
  
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// If no matching route is found default to home
app.get("*", (req, res)=> {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.listen (PORT, () => {
  console.log(`app listening on port: ${PORT}`)
})