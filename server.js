const express = require ("express");
const uuidv1 = require("uuid/v1");

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



//api routes
app.get / 

app.get("/api/notes:id", (req, res){

})



//at bottom
app.get *

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

 console.log(noteObj);

})


app.listen(PORT, () =>{
    console.log(`app listening on port: ${PORT}`)
})

app.delete("/api/notes:id", (req, res){

})
