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

var global_data = JSON.parse(fs.readFileSync("db/db.json"));
// console.log ("This is the global data" + global_data);

///////////////////////////////

app.get("/api/notes", (req, res) => { 
res.json(global_data);
console.log(global_data);
})

//post notes
app.post("/api/notes", (req,res) =>{
const noteObj = req.body;
noteObj.id = uuidv1();
global_data.push(noteObj);
fs.writeFileSync("db/db.json", JSON.stringify(global_data));
res.json(global_data)

})

//app.delete code
app.delete("/api/notes/:id", (req, res) => {
var id = req.params.id;
const deletedNotes = global_data.filter(function(id){
  console.log(req.params);
return id !== req.params.id;

})

fs.writeFileSync("db/db.json", JSON.stringify(deletedNotes));
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