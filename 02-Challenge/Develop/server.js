const express = require("express");
const path = require('path');
const app = express();
const PORT = 3001;
const file = require('../Develop/db/db.json')
app.use(express.static('public'));

//This is basically like boiler plate server stuff

//this is for the json api notes
app.get('/api/notes' , (req,res) =>
res.json({
    term:file,
    description:'The database for the notes that are being taken'
}));


//this is for the html for notes
app.get('/notes' , (req,res) =>
    res.sendFile(path.join(__dirname, '../Develop/public/notes.html'))
);


//this is just something that triggers when the server gets running.
app.listen(PORT, () => 
    console.log("server is listening!")
    );
