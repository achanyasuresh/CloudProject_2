const ItemRepository = require(`../repository/item.repository`);
const GroupRepository = require(`../repository/group.repository`);

const groupRepo = new GroupRepository();

class ItemService {
    
    async create(data) {
        var itemRepository = new ItemRepository("groups");
        return await itemRepository.create(data);
    }

    async findByID(itemId) {
        const data = await groupRepo.findByID(itemId);

        console.log("the data : " + JSON.stringify(data));
        if (data) {
            return data.Items;
        }

        return data;
    }

    async update(groupId, data) {
        return await groupRepo.update(groupId, data)
    }

    async deleteByID(UserID) {
        return await itemRepository.deleteByID(UserID);
    }

}

module.exports = ItemService;
