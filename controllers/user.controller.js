const mongoose = require('mongoose');

// const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const passport = require('passport');
const _ = require('lodash');

const Employee = mongoose.model('Employee');
const Manager = mongoose.model('Manager');

module.exports.register = (req, res, next) => {
    var manager = new Manager();

    manager.firstName = req.body.firstName;
    manager.lastName = req.body.lastName;
    manager.email = req.body.email;
    manager.password = req.body.password;
    manager.address = req.body.address;
    manager.dob = req.body.dob;
    manager.company = req.body.company;



    manager.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    Manager.find({},
        (err, manager) => {
            if (!manager)
                return res.status(404).json({ status: false, message: 'Manager record not found.' });
            else
                // return res.status(200).json({ status: true, manager: _.pick(manager, ["firstName", "lastName", 'email']) });
                return res.status(200).json({ status: true, manager: manager });
        }
    );
}
module.exports.showEmployee = async  (req, res, next) => {
    // const employee = await Employee.find();
    // res.json(employee);
    await Employee.find({},
        (err, employee) => {
            if (!employee)
                return res.status(404).json({ status: false, message: 'Manager record not found.' });
            else
                return res.status(200).json({ status: true, employee: employee });
        }
    );
}


// module.exports.addEmployee = (req, res, next) => {
//     var employee = new Employee();

//     employee.firstName = req.body.firstName;
//     employee.lastName = req.body.lastName; 
//     employee.mobile = req.body.mobile;
//     employee.address = req.body.address;
//     employee.dob = req.body.dob;
//     employee.city = req.body.city;

//     employee.save((err, doc) => {
//         if (!err)
//             res.send(doc);
//         else {
//             return next(err);
//         }

//     });
// }

module.exports.addEmployee = async (req, res, next) =>  {
    await new Employee(req.body).save((err, data) => {
    if (err) {
      // if there is an error send the following response
      res.status(500).json({
        message:
          "Something went wrong, please try again later.",
      });
    } else {
      // if success send the following response
      res.status(200).json({
        message: "Employee Created",
        data,
      });
    }
  });
}


// module.exports.editEmployee = (req, res, next) => {
//     // if (_Id.isValid(req.params.id))
//         // return res.status(400).send({ status: false, message: `No record with given id : ${req.params.id}` });

//     var emp = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         // empid: req.body.empid,
//         mobile: req.body.mobile,
//         address: req.body.address,
//         dob: req.body.dob,
//         city: req.body.city,
//     };
//     Employee.findByIdAndUpdate({ _id: req.params.id }, { $set: emp }, { new: true }, (err, doc) => {
//         if (!err) { res.send(doc).status(200).json({ status: true, message: 'employee Update ' }); }
//         else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
//     });

//     // var employee = new Employee();

//     // employee.id = req.body._id;
//     // employee.firstName = req.body.firstName;
//     // employee.lastName = req.body.lastName;
//     // employee.email = req.body.email;
//     // employee.mobile = req.body.mobile;
//     // employee.address = req.body.address;
//     // employee.dob = req.body.dob;
//     // employee.city = req.body.city;


//     // Employee.find({},
//     //     (err, employee) => {
//     //         if (!employee)
//     //             return res.status(404).json({ status: false, message: 'Manager record not found.' });
//     //         else
//     //             // return res.status(200).json({ status: true, employee: _.pick(employee, ["empid", "firstName", "lastName", "mobile", "address", "dob", "city"]) });
//     //             return res.status(200).json({ status: true, employee: employee });
//     //     }
//     // );
// }

module.exports.editEmployee = async (req, res, next)=>{
    // get a postID.
  let empID = req.params.id;

  // we will use findByIdAndUpdate function : findByIdAndUpdate(id, data, callback)
  await Employee.findByIdAndUpdate({_id: empID}, {$set : req.body}, (err, data) => {
    if (err) {
      res.status(500).json({
        message:
          "Something went wrong, please try again later.",
      });
    } else {
      res.status(200).json({
        message: "Employee Updated",
        data,
      });
    }
  });
}
// module.exports.delEmployee = (req, res, next) => {

//     // if (!ObjectId.isValid(req.params.id))
//     // return res.status(400).send(`No record with given id : ${req.params.id}`);

// Employee.findByIdAndRemove({_id:req.params.id}, (err, doc) => {
//         if (!err) { res.send(doc)  }
//         else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
//     });
//     // });
//     // console.log("req.body._id"+req.body._id);
//     // Employee.find({},
//     //     (err, employee) => {
//     //         if (!employee)
//     //             return res.status(404).json({ status: false, message: 'Manager record not found.' });
//     //         else
//     //             // return res.status(200).json({ status: true, employee: _.pick(employee, ["empid", "firstName", "lastName", "mobile", "address", "dob", "city"]) });
//     //             return res.status(200).json({ status: true, employee: employee });
//     //     }
//     // );
// }
module.exports.delEmployee = async(req, res, next) => {
    let empID = req.params.id;
    // we use mongodb's deleteOne() functionality here
    await Employee.deleteOne({ _id: empID }, (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            "Something went wrong, please try again later.",
        });
      } else {
        res.status(200).json({
          message: "Employee Deleted"
        });
      }
    });

}