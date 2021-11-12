const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    status: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', Userschema);