const User = require('../models/User.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.fullname) {
        return res.status(400).send({
            message: "fullname content can not be empty"
        });
    }
    if(!req.body.email) {
        return res.status(400).send({
            message: "email content can not be empty"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "password content can not be empty"
        });
    }
    if(!req.body.status) {
        return res.status(400).send({
            message: "status content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        fullname: req.body.fullname , 
        email:req.body.email,
        password: req.body.password,
        status: req.body.status
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all User from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving User."
        });
    });
};

// Find a single User with a id
exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
        });
    });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.fullname) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find User and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        fullname: req.body.fullname, 
        email:req.body.email,
        password: req.body.password,
        status: req.body.status
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.id
        });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(User => {
        if(!User) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.id
        });
    });
};
