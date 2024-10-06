const UserController = require('../modules/user/controller/user.controller');
const AuthenticationController = require('../modules/user/controller/authentication.controller')
const GroupController = require('../modules/user/controller/group.controller')
const EventController = require('../modules/user/controller/event.controller');

const AuthenticationService = require('../modules/user/service/authentication.service');
const req = require('express/lib/request');
const NotificationController = require('../modules/user/controller/notification.controller');

const authenticationService = new AuthenticationService();

const userController = new UserController();
const authenticationController = new AuthenticationController();
const groupController = new GroupController();
const eventController = new EventController();
const notificationController = new NotificationController();

module.exports = async (app) => {

    
    // app.get('/test', UserController)
    app.get('/api/v1/test', userController.test);

    app.get(`/api/v1/users`, authenticationService.validateJwt, userController.findByID);
    app.post(`/api/v1/users/fetch`, authenticationService.validateJwt, userController.findByListIds);
    app.post(`/api/v1/users`, userController.create);
    app.put(`/api/v1/users/:UserID`, authenticationService.validateJwt, userController.update);
    app.delete(`/api/v1/users/:UserID`, authenticationService.validateJwt, userController.deleteByID);

    app.post('/api/v1/group', authenticationService.validateJwt, groupController.create);
    app.get('/api/v1/group', authenticationService.validateJwt, groupController.findByID);
    app.put('/api/v1/group', authenticationService.validateJwt, groupController.update);
    app.put('/api/v1/group/members', authenticationService.validateJwt, groupController.updateMembers);
    app.post('/api/v1/group/file/upload', authenticationService.validateJwt, groupController.uploadFileSubmission);

    app.post('/api/v1/event', authenticationService.validateJwt, eventController.create);
    app.get('/api/v1/event', authenticationService.validateJwt, eventController.findByID);
    app.get('/api/v1/event/all', authenticationService.validateJwt, eventController.findAll);
    app.put('/api/v1/event', authenticationService.validateJwt, eventController.update);

    app.post('/api/v1/authenticate/login', authenticationController.login);

    app.post('/api/v1/notification', notificationController.sendNotification);
    app.post('/api/v1/notification/register', notificationController.subscribeToTopic);
};  