const JoinedClass = require('../models/JoinedClass.model.js');
const UserController = require('../controllers/user.controller');
const User = require('../models/User.model.js');

// Retrieve and return all Classroom from the database.
exports.findAllbyClassId = (req, res) => {
    JoinedClass.find({
        idClass: req.params.id
    })
        .populate("idClass")
        .populate("idUser")
        .then(joinedClass => {
            res.send(joinedClass);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Joined Class."
            });
        });
};

exports.findClassJoinByMail = (req, res) => {
    User.find({ email: req.params.email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with email " + req.params.email
                });
            }
            JoinedClass.find({
                idUser: user[0]._id
            })
                .populate("idClass")
                //.populate("idUser")
                .then(joinedClass => {
                    res.send(joinedClass);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving Joined Class."
                    });
                });
        })

};

exports.countAllStuInClass = (req, res) => {
    JoinedClass.find({
        idClass: req.params.id
    })
        //.populate("idClass")
        .populate("idUser")
        .countDocuments()
        .then(joinedClass => {
            res.send(
                { message: "" + joinedClass });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Joined Class."
            });
        });
};
