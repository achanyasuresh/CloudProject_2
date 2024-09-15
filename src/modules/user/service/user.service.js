const UserRepository = require(`../repository/user.repository`);

class UserService {

    async findByID(UserID) {
        const data = await UserRepository.findByID(UserID);

        console.log("the data : " + JSON.stringify(data));
        if (data) {
            return data.Items;
        }

        return data;
    }

    async create(data) {
        console.log("we've reached the service layer");
        console.log("the data: " + JSON.stringify(data));
        return await UserRepository.create({
            Username: data.Username
        });
    }

    async update(UserID, data) {
        return await UserRepository.update(UserID, {
            Username: data.Username
        });
    }

    async deleteByID(UserID) {
        return await UserRepository.deleteByID(UserID);
    }

}

module.exports = new UserService()
