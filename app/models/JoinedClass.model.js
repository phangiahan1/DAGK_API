const mongoose = require('mongoose');
const ClassroomModel = require('./Classroom.model');
const UserModel = require('./user.model')
const Schema = mongoose.Schema;


const JoinedClassSchema = new Schema({
    idClass:{type:Schema.Types.ObjectId, ref: ClassroomModel},
    idUser:{type:Schema.Types.ObjectId, ref: UserModel}
},{
    collection: 'joinedclass'
});

 module.exports = mongoose.model('JoinedClass', JoinedClassSchema);