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

        console.log("The params: " + JSON.stringify(req.params));
        console.log("The query stuff: " + JSON.stringify(req.query));
        console.log("The query stuff: " + req.query.groupId);

        const data = await groupService.findByID(req.query.groupId)

        res.json(data)
    }

    async update(req, res) {
        const data = await groupService.update(req.query.groupId, req.body)

        res.json(data)
    }

    async updateMembers(req, res) {
        const data = await groupService.updateMembers(req.query.groupId, req.body.members)

        res.json(data)
    }

    async uploadFileSubmission(req, res) {

        console.log("the file was captured: " + req.files.submission);
        console.log("the file was captured: " + req.files.submission.name);
        
        const data = await groupService.uploadFileSubmission(req.query.groupId, req.files.submission.name, req.files.submission.data);
        
        res.json(data);
    }

}

module.exports = GroupController;
