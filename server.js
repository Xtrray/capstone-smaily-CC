const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};
const db = require("./app/models");
db.sequelize.sync({ alter: true }).then(() => {
    console.log("Alter and re-sync db.");
});
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Smaily." });
});
app.get("/register", (req, res) => {
    res.json({ message: "Please fill the necessary column in order to register your account" });
})
app.get("/login", (req, res) => {
    res.json({ message: "Please login to your account by entering your account's username or email and password" });
})
require("./app/routes/smaily.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});