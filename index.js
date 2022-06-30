const express = require("express");
var session = require('express-session')
const cors = require("cors");
const app = express();

app.set('trust proxy', 1);
app.use(session({
    secret: 'somerandomsecretkey',
    resave: true,
    saveUninitialized: true,
    unset: 'keep',
    cookie: { secure: false, httpOnly: false, sameSite: false}
}))

app.use(express.static("./client/build"));

app.use(express.json());

// Enabling cors
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    callback(null, true);
  }
}

app.use(cors(corsOptions));

const messageRouter = require("./server/routes/MessageRouter");
app.use("/message", messageRouter);

const userRouter = require("./server/routes/UserRouter");
app.use("/user", userRouter);

app.listen(80);