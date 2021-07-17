const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {    useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});




// mongoose.connect(process.env.DB_URL, {
//     dbName: process.env.DB_NAME,
//     // user: process.env.DB_USER,
//     // pass: process.env.DB_PASSWORD,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: true,
    // useCreateIndex: true,
// })
//     .then(() => console.log("mongo Connect"))
//     .catch(err => console.log(err));


require('./user.model');