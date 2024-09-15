const UserService = require(`../service/user.service`);

class UserController {

    async findByID(req, res) {

        console.log("reached the controller: " + JSON.stringify(req.query));

        const data = await UserService.findByID(req.query.UserID)

        res.json(data)
    }

    async create(req, res) {

        console.log("we've reached the controller layer");
        const data = await UserService.create(req.body)

        res.json(data)
    }

    async update(req, res) {
        const data = await UserService.update(req.params.UserID, req.body)

        res.json(data)
    }

    async deleteByID(req, res) {
        await UserService.deleteByID(req.params.UserID)

        res.json(`Success`)
    }

}

module.exports = new UserController()
