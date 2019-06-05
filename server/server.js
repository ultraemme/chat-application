const fs = require('fs');
const chat = require('./logs.json');
const users = require('./users.json');
const cfg = require('./config.json');
const express = require('express');
const app = express();

let writeFile;

function writeFileTimeout() {
  clearTimeout(writeFile);
  writeFile = setTimeout(() => {
    fs.writeFile('./logs.json', JSON.stringify(chat), (err) => {
      if (err) throw err;
      writeFileTimeout();
    })
  }, 30000)
}

writeFileTimeout();

function generateId(arr) {
  return arr[arr.length-1].id;
}

let roomId = generateId(chat.chat);
let msgId = generateId(chat.chat[chat.chat.length-1].messages);
console.log(`roomId: ${roomId}, msgId: ${msgId}`);

app.use(express.json());

app.get("/chat", (req, res) => {
  res.status(200).send(chat);
})

app.get("/validate/:username", (req, res) => {
  let username = req.params.username;
  if (users.users.some(user => user.username === username)) {
    res.status(409).send("username already exists");
  }
  res.status(200).end();
})

app.get("/login/:username/:password", (req, res) => {
  console.log(users);
  for (let user of users.users) {
    if (user.username === req.params.username) {
      if (user.password === req.params.password) {
        //proceed to login
        console.log("valid login details");
      } else {
        console.log("invalid password");
      }
    } else {
      //proceed to add user
      console.log("user does not exist")
    }
  }
  res.end();
})

app.post("/chat", (req, res) => {
  roomId++;
  msgId++;
  const body = req.body;
  const room = {
    id: roomId,
    name: body.name,
    messages: [
      {
        id:msgId,
        user: "Server",
        message: "Start chatting! :~)"
      }
    ]
  }
  chat.chat.push(room);
  res.status(200).send(room);
})

app.post("/chat/msg", (req, res) => {
  //know which room then loop through rooms until find correct id, push into that
  msgId++;
  const body = req.body;
  const msg = {
    id: msgId,
    user: body.user,
    message: body.message
  }
})





const port = cfg.website.port;
app.listen(port, () => console.log(`Listening on ${port}`))