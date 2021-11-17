const User = require('../models/User.model.js');
const jwt = require('jsonwebtoken');
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "Uername content can not be empty"
        });
    }
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email content can not be empty"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Password content can not be empty"
        });
    }
    if(!req.body.status) {
        return res.status(400).send({
            message: "Status content can not be empty"
        });
    }

    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!filter.test(req.body.email)) {
        return res.status(400).send({
            message: "Email is illegal"
        });

    }

    // Create a User
    const user = new User({
        username: req.body.username , 
        email:req.body.email,
        password: req.body.password,
        status: req.body.status
    });

    // Save User in the database
    user.save()
    .then(user => {
        const token = jwt.sign({
            username: user.username,
            email: user.email,
            password: user.password,
        },
        'secrect123'
        )
        res.status(200).send(token);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

//login user
exports.login = (req, res) => {
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email content can not be empty"
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message: "Password content can not be empty"
        });
    }
    const user = User.findOne({
        email:req.body.email,
        password: req.body.password,
    })
    .then(user => {
        const token = jwt.sign({
            username: user.username,
            email: user.email,
            password: user.password,
        },
        'secrect123'
        )
        res.status(200).send(token);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Login fail"
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

exports.findOneEmail = (req, res) => {
    User.find({email: req.params.email})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.email
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.email
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
    if(!req.body.username) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find User and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        username: req.body.username, 
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
