const ItemRepository = require(`../repository/item.repository`);
const userRepository = require("../repository/user.repository");

class ItemService {

    async findByID(itemId) {
        const data = await userRepository.findByID(itemId);

        console.log("the data : " + JSON.stringify(data));
        if (data) {
            return data.Items;
        }

        return data;
    }

    async create(data) {
        return await userRepository.create(data);
    }

    async update(UserID, data) {
        return await itemRepository.update(UserID, {
            Username: data.Username
        });
    }

    async deleteByID(UserID) {
        return await itemRepository.deleteByID(UserID);
    }

}

module.exports = ItemService;
