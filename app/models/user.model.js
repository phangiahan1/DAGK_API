const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    status: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', Userschema);