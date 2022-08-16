require("dotenv").config();
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

app.get(
    "/now",
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.send({
            time: req.time
        });
    }
);

module.exports = app;
