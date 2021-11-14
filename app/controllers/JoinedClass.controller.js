const JoinedClass = require('../models/JoinedClass.model.js');

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

exports.countAllStuInClass = (req, res) => {
    JoinedClass.find({
        idClass: req.params.id
    })
    //.populate("idClass")
    .populate("idUser")
    .countDocuments()
    .then(joinedClass => {  
        res.send(
            {message: ""+ joinedClass});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Joined Class."
        });
    });
};
