const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const file = require("./db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const ID = uuidv4();


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

//this is just something that triggers when the server gets running.
app.listen(PORT, () => console.log("server is listening!"));