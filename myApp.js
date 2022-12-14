require("dotenv").config();
let bodyParser = require("body-parser");
let express = require('express');
let app = express();

console.log("Hello Express");

// middlewares
app.use("/public", express.static(__dirname + '/public'));

app.use("/", function (req, res, next) {
    console.log("I'm a middleware...");
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }
    res.json({ "message": message });
});

app.get("/now", function (req, res, next) {
    req.time = (new Date().toString());
    next();
}, function (req, res) {
    res.send({ "time": req.time });
});

app.get("/:word/echo", function (req, res) {
    res.send({ "echo": req.params.word });
});

app.get("/name", function (req, res) {
    const name = req.query.first + ' ' + req.query.last;
    res.send({ "name": name });
});

app.post("/name", function (req, res) {
    const body = req.body;
    const name = body.first + ' ' + body.last;
    res.send({ "name": name });
});

module.exports = app;
