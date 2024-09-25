const UserController = require('../modules/user/controller/user.controller');

const userController = new UserController();

module.exports = async (app) => {

    
    // app.get('/test', UserController)
    app.get('/api/v1/test', userController.test);
    app.get(`/api/v1/users`, userController.findByID);
    app.post(`/api/v1/users`, userController.create);
    app.patch(`/api/v1/users/:UserID`, userController.update);
    app.delete(`/api/v1/users/:UserID`, userController.deleteByID);
};
