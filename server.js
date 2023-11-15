const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const file = require("./db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");



app.use(express.static("public"));
app.use(express.json());
//This is basically like boiler plate server stuff

//this is for the json api notes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/api/notes", (req, res) => res.json(file));

app.get("/api/notes/:id", (req, res) => {
  const reqId = req.params.id;
  console.log(reqId);

  for (let i = 0; i < file.length; i++) {
    if (reqId === file[i].id) {
      console.log("Loop is happening");
      return res.json(file[i]);
    }
  }
});

//this is for the html for notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.post("/api/notes", (req, res) => {
  const ID = uuidv4();
  console.info(`${req.method} request received to add a review`);
  console.info(req.body);
  const noteDb = file;
  const postNote = {
    id: ID,
    title: req.body.title,
    text: req.body.text,
  };

  noteDb.push(postNote);
  fs.writeFile("./db/db.json", JSON.stringify(noteDb), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("no err");
    }
  });
  res.json(postNote);
});


app.delete("/api/notes/:id" , async (req,res) => {
// we have to loop through the json object and compare the paramter id with the req.body.id
    const data = file;
    let paramId = req.params.id
    
    for (let i = 0; i < data.length; i++) {
      
       console.log("old data",data)

      if (data[i].id = paramId ) {
        data.splice(i,1);
        console.log("New data",data);
        fs.writeFile("./db/db.json", JSON.stringify(data), (err) => {
         if (err){
          console.log(err)
         } else {
          console.log("note deleted");
         }
        })

        return 
      }
    }
    })



//this is just something that triggers when the server gets running.
app.listen(PORT, () => console.log("server is listening!"));