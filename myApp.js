let express = require('express');
let app = express();

console.log("Hello Express");

app.get("", function (req, res) {
    res.send("Hello Express");
});































module.exports = app;
