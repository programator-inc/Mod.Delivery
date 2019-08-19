const express = require('express');

// Instance de notre application. 
// Elle possede dans ses proprietes un objet Router sur lequel on devra greffer nos route
var app = express();

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// ----------------------------------------
// ENV
// ----------------------------------------
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// ----------------------------------------
// Body Parser
// ----------------------------------------

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))
// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// ----------------------------------------
// Routes
// ----------------------------------------
//importation des routes en passant l instance de notre 
// application afin que ces routes y soient greffees
require('./routes')(app);
console.log("Ok This is routed");

//-------------------//
// Mongoose Settings //
//-------------------//
const mongoose = require("mongoose");

console.log("mongoose stuff intialized");
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
    console.log("use for mongoose callback");
    if (mongoose.connection.readyState) {
        console.log("Connected");
        next();
    } else {
        console.log("Connecting");
        require("./config/mongo")().then(() => next());
    }
});




// ----------------------------------------
// Server                                //
// ----------------------------------------
const port = process.env.PORT || process.argv[2] || 3000;
const host = "localhost";

let args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
    console.log(`Listening: http://${host}:${port}\n`);
});

if (require.main === module) {
    app.listen.apply(app, args);
}


app.use(express.static(path.join(__dirname, 'views')));

app.engine('html', require('ejs').renderFile)
app.set("view engine", "html");

//creation de la route vers le dossier public
app.use('/', express.static('public'));

//creation de la route vers le dossier d'image en public
app.use('/', express.static('api'));

//Set public forder /acess
app.use('/static', express.static('./Storage/'));

// define a route to download a file 
app.get('/statics/:file(*)', (req, res) => {
    var file = req.params.file;
    var fileLocation = path.join('./storage', file);
    console.log(fileLocation);
    res.download(fileLocation, file);
});

app.get('/', (req, res) => {
    // res.send("Bienvenue à l'accueil");
    res.render('./home/index.html');
});