module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/user', user.create);

    // Retrieve all user
    app.get('/user', user.findAll);

    // Retrieve a single Note with noteId
    app.get('/user/:id', user.findOne);

    // Retrieve a single Note with noteId
    app.get('/user/findEmail/:email', user.findOneEmail);

    // Update a Note with noteId
    app.put('/user/:id', user.update);

    // Delete a Note with noteId
    app.delete('/user/:id', user.delete);
}