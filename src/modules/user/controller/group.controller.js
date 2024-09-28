const UserService = require(`../service/item.service`);
const GroupService = require(`../service/group.service`);
const AuthenticationService = require('../service/authentication.service');

const authenticationService = new AuthenticationService();
const groupService = new GroupService();

class GroupController {

    async create(req, res) {

        const data = await groupService.create(req.body)
        console.log("the data put into the table: " + JSON.stringify(data));
        console.log("the data put into the table string: " + data.json);

        res.json(data)
    }

    async findByID(req, res) {

        console.log("The params: " + JSON.stringify(req.params));
        console.log("The query stuff: " + JSON.stringify(req.query));
        console.log("The query stuff: " + req.query.groupId);

        const data = await groupService.findByID(req.query.groupId)

        res.json(data)
    }

    async update(req, res) {
        const data = await groupService.update(req.params.groupId, req.body)

        res.json(data)
    }

}

module.exports = GroupController;
