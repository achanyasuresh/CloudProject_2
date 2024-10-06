const UserRepository = require("../repository/user.repository");
const ItemRepository = require("../repository/item.repository");

const userRepo = new UserRepository();

class UserService {
    constructor() {
        this.itemRepository = new ItemRepository("users");
    }

    async findByID(itemId) {
        console.log("at the service level");
        const data = await userRepo.findByID(itemId);
        console.log("the data : " + JSON.stringify(data));
        if (data) {
            return data.Items;
        }
        return data;
    }

    async findByListIds(userIds) {
        const data = await userRepo.findByEmail(userIds);
        console.log("the data : " + JSON.stringify(data));
        if (data) {
            return data.Items;
        }
        return data;
    }

    async create(data) {
        console.log("we've reached the service layer");
        console.log("the data: " + JSON.stringify(data));
        console.log("the data: " + JSON.stringify(data));
    console.log("Item Repository instance:", this.itemRepository);
    console.log("Item Repository create method:", this.itemRepository.create);
    return await userRepo.create(data);
    }

    async update(UserID, data) {
        return await this.itemRepository.update(UserID, {
            Username: data.Username
        });
    }

    async deleteByID(UserID) {
        return await this.itemRepository.deleteByID(UserID);
    }
}

module.exports = UserService;
