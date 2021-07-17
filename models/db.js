const mongoose = require('mongoose');
require('dotenv').config()

 

// mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     dbName: process.env.DB_NAME,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// }, (err) => {
//     if (!err) { console.log('MongoDB connection succeeded.'); }
//     else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
// });




mongoose.connect(process.env.ON_DB_URL, {
    dbName: process.env.ON_DB_NAME,
    user: process.env.ON_DB_USER,
    pass: process.env.ON_DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
})   
    .then(() => console.log("MongoDB connection succeeded"))
    .catch(err => console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)));

require('./user.model');