const UserService = require(`../service/item.service`);
const ItemService = require(`../service/item.service`);
const AuthenticationService = require('../service/authentication.service');
const NotificationService = require('../service/notification.service');

const authenticationService = new AuthenticationService();
const userService = new UserService();
const notificationService = new NotificationService();

class UserController {

    async test(req, res) {

        res.json({
            "item": "Hi there, the server is up and running"
        });
    }

    async findByID(req, res) {

        const data = await userService.findByID(req.query.UserID)
        res.json(data)
    }

    async create(req, res) {

        const data = await userService.create(req.body)
        notificationService.subscribeToTopic(req.body.email);
        res.json(data)
    }

    async update(req, res) {
        const data = await itemService.update(req.params.UserID, req.body)

        res.json(data)
    }

    async deleteByID(req, res) {
        await itemService.deleteByID(req.params.UserID)

        res.json(`Success`)
    }

}

module.exports = UserController;
