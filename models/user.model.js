const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var managerSchema = new mongoose.Schema({
    // id: { type: Number, primaryKey: true, autoIncrement: true, },
    firstName: { type: String, required: 'First name can\'t be empty' },
    lastName: { type: String, required: 'Last name can\'t be empty' },
    email: { type: String, required: 'Email can\'t be empty', unique: true },
    password: { type: String, required: 'Password can\'t be empty', minlength: [4, 'Password must be atleast 4 character long'] },
    address: { type: String, required: 'Address can\'t be empty' },
    dob: { type: String, required: 'Date Of Birth can\'t be empty' },
    company: { type: String, required: 'Company name can\'t be empty' },
    saltSecret: String

});

// Custom validation for email
managerSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
managerSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
managerSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

managerSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}
 

var employeeSchema = new mongoose.Schema({
    // id: { type: Number, primaryKey: true, autoIncrement: true, },
    // empid: { type: String, required: 'Email can\'t be empty', unique: true },
    // empid: { type: Number, primaryKey: true, autoIncrement: true, unique: true },
    firstName: { type: String, required: 'First name can\'t be empty' },
    lastName: { type: String, required: 'Last name can\'t be empty' },
    mobile: { type: String, required: 'Mobile can\'t be empty', minlength: [10, 'Password must be atleast 10 number'] },
    address: { type: String, required: 'Address can\'t be empty' },
    dob: { type: String, required: 'Date Of Birth can\'t be empty' },
    city: { type: String, required: 'City name can\'t be empty' }
});


mongoose.model('Manager', managerSchema);
mongoose.model('Employee', employeeSchema);
