const UserService = require(`../service/item.service`);
const GroupService = require(`../service/group.service`);
const AuthenticationService = require('../service/authentication.service');

const authenticationService = new AuthenticationService();
const groupService = new GroupService();

class GroupController {

    async create(req, res) {

        const data = await groupService.create(req.body)
        console.log("the data put into the table: " + data);
        console.log("the data put into the table string: " + JSON.stringify(data));

        res.json(data)
    }

    async findByID(req, res) {

        const data = await groupService.findByID(req.query.UserID)

        res.json(data)
    }

    async update(req, res) {
        const data = await groupService.update(req.params.groupId, req.body)

        res.json(data)
    }

}

module.exports = GroupController;
