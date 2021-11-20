module.exports = (app) => {
    const classroom = require('../controllers/Classroom.controller.js');
    const joinedClass = require('../controllers/JoinedClass.controller');

    // Find all user in classroom 
    app.get('/classroom/:id/alluser', joinedClass.findAllbyClassId);
    app.get('/classroom/:id/alluserCount', joinedClass.countAllStuInClass);

    //Find all class usser join 
    app.get('/classroom/:email/joined', joinedClass.findClassJoinByMail);

}