const fs = require('fs');
const chat = require('./logs.json');
const users = require('./users.json');
const cfg = require('./config.json');
const express = require('express');
const crypto = require('crypto');
const app = express();

const socket = require('socket.io');
const port = cfg.website.port;
const server = app.listen(port, () => console.log(`Listening on ${port}`));
const io = socket(server);

io.on('connection', (socket) => {
  console.log('connection established ' + socket.id)

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  })
})
//empty users {"users":[]}

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

// writeFileTimeout();

function generateId(arr) {
  return arr[arr.length-1].id;
}

let roomId = generateId(chat.logs);
let msgId = generateId(chat.logs[chat.logs.length-1].messages);
console.log(`roomId: ${roomId}, msgId: ${msgId}`);

app.use(express.json());

app.get("/chat", (req, res) => {
  res.status(200).send(chat);
})

app.get("/validate/:username", (req, res) => {
  const exists = users.users.some(user => user.username === req.params.username);
  if (!exists) {
    res.status(200).end();
  } else {
    res.send("user exists");
  }
})

app.post("/login", (req, res) => {
  crypto.pbkdf2(req.body.password, 'emilsfetaserver', 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    let user = {username: req.body.username, password: derivedKey.toString('hex')};
    if (users.users.length < 1) { //add first user no matter what
      users.users.push(user);
      res.status(200).send("Registered!");
      //write to users.json
    } else {
      const exists = users.users.some(user => user.username === req.body.username);
      if (exists) { //conclusion is that user already exist, now check pw
        for (let u of users.users) {
          if (u.username === req.body.username) {
            if (u.password === derivedKey.toString('hex')) {
              res.status(200).send("Login started!");
            } else {
              res.status(401).send("Invalid username or password...");
            }
          }
        }
      } else { //username doesn't exist, therefore we added the user
        users.users.push(user);
        res.status(200).send("Registered!");
        //write to users.json
      }
    }
  });
})

app.get("/channels", (req, res) => {
  res.status(200).send(chat);
})

app.post("/channels", (req, res) => {
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
  chat.logs.push(room);
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
});

