const UserService = require(`../service/item.service`);
const ItemService = require(`../service/item.service`);
const AuthenticationService = require('../service/authentication.service');

const authenticationService = new AuthenticationService();

class UserController {

    async test(req, res) {

        res.json({
            "item": "Hi there, the server is up and running"
        });
    }

    async findByID(req, res) {

        try {
            await authenticationService.validateJwt(req, res);
        } catch (error) {
            console.log("the jwt validator error: " + error);
            return res.status(401)
                .json({
                    "internalMessage": "Invalid JWT token",
                    "message": "Authentication failure"
                });
        }

        var itemService = new ItemService("user");
        console.log("reached the controller: " + JSON.stringify(req.query));

        const data = await itemService.findByID(req.query.UserID)

        res.json(data)
    }

    async create(req, res) {

        var itemService = new ItemService("user");
        console.log("we've reached the controller layer: " + itemService);
        const data = await itemService.create(req.body)

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
