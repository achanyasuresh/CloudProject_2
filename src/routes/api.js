const UserController = require('../modules/user/controller/user.controller');
const AuthenticationController = require('../modules/user/controller/authentication.controller')
const GroupController = require('../modules/user/controller/group.controller')

const AuthenticationService = require('../modules/user/service/authentication.service')

const authenticationService = new AuthenticationService();

const userController = new UserController();
const authenticationController = new AuthenticationController();
const groupController = new GroupController();

module.exports = async (app) => {

    
    // app.get('/test', UserController)
    app.get('/api/v1/test', userController.test);

    app.get(`/api/v1/users`, authenticationService.validateJwt, userController.findByID);
    app.post(`/api/v1/users`, authenticationService.validateJwt, userController.create);
    app.put(`/api/v1/users/:UserID`, authenticationService.validateJwt, userController.update);
    app.delete(`/api/v1/users/:UserID`, authenticationService.validateJwt, userController.deleteByID);

    app.post('/api/v1/group', authenticationService.validateJwt, groupController.create);
    app.get('/api/v1/group', authenticationService.validateJwt, groupController.findByID);
    app.put('/api/v1/group', authenticationService.validateJwt, groupController.update);

    app.post('/api/v1/authenticate/login', authenticationController.login);
};
