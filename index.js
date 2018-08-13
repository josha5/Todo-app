let express = require("express");
let app = express();
let port = process.env.PORT || 3000;
let db = require("./models");
let todoRoutes = require("./routes/todos");
const bodyParser = require("body-parser");


/*********MIDDLEWARE *********/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("HI THERE FROM THE ROOT ROUTE");
});

/*********USE ROUTES **********/
app.use("/api/todos", todoRoutes);

app.listen(port, function() {
    console.log("App running on port 3000!");
});