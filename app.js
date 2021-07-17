require('./models/db');
require('./config/passportConfig');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rtsIndex = require('./routes/index.router');

require('dotenv').config()

var app = express();

let PORT = process.env.PORT || 3333;

// Logger
app.use(logger('dev'));

// body parsers
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));


app.use(cors());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(passport.initialize());
app.use('/api', rtsIndex);

app.get("/", (req, res) => {
    return res.send("<h1>Wel Come To Mind Browser Assignment</h1>");
})

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    } else {
        console.log(err);
    }
});

// start server
app.listen(PORT, () => {
    console.log(`Express running → PORT  ${PORT}/`)
});