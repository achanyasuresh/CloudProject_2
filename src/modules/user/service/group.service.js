const ItemRepository = require(`../repository/item.repository`);
const GroupRepository = require(`../repository/group.repository`);

const groupRepo = new GroupRepository();

class GroupService {
    
    async create(data) {
        
        if (!data.members) {
            data.members = [];
        }
        if (!data.group_files) {
            data.group_files = [];
        }
        var group_data = await groupRepo.create(data);

        
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

module.exports = GroupService;
