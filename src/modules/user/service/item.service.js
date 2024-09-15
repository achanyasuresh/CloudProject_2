const UserRepository = require(`../repository/user.repository`);
const ItemRepository = require(`../repository/item.repository`);

class ItemService {

    async findByID(itemId) {
        var itemRepository = new ItemRepository("users");
        const data = await itemRepository.findByID(itemId);

        console.log("the data : " + JSON.stringify(data));
        if (data) {
            return data.Items;
        }

        return data;
    }

    async create(data) {
        var itemRepository = new ItemRepository("users");
        console.log("we've reached the service layer");
        console.log("the data: " + JSON.stringify(data));
        return await itemRepository.create(data);
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
