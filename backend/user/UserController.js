const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('./User');

router.route('/').get(function (req, res) {
    User.find(function (err, user) {
        if (err) {
            res.status(404).send("depression");
        } else {
            res.json(user);
        }
    });
});

router.route('/add').post((req, res) => {
    User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database");
            res.status(200).send(user);
        });
});

// // router.get('/', function (req, res) {
// //     User.find({}, function (err, users) {
// //         if (err) return res.status(500).send("There was a problem finding the users.");
// //         res.status(200).send(users);
// //     });
// // });

// // GETS A SINGLE USER FROM THE DATABASE
// router.get('/:id', function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).send(user);
//     });
// });

// // DELETES A USER FROM THE DATABASE
// router.delete('/:id', function (req, res) {
//     User.findByIdAndRemove(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem deleting the user.");
//         res.status(200).send("User: "+ user.name +" was deleted.");
//     });
// });

// // UPDATES A SINGLE USER IN THE DATABASE
// router.put('/:id', function (req, res) {
//     User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//         if (err) return res.status(500).send("There was a problem updating the user.");
//         res.status(200).send(user);
//     });
// });


module.exports = router;