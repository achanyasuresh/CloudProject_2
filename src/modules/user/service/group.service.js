const ItemRepository = require(`../repository/item.repository`);
const GroupRepository = require(`../repository/group.repository`);
const userRepo = require('../repository/user.repository');

const groupRepo = new GroupRepository();

class GroupService {
    
    async create(data) {
        
        if (!data.members) {
            data.members = [];
        }
        if (!data.group_files) {
            data.group_files = [];
        }
        var group_data_raw = await groupRepo.create(data);
        var group_data = group_data_raw.Attributes;

        var members = group_data.members;

        var userIds = members.map((user, index) => {
            return user.user_id
        });

        var users = await userRepo.findByListIds(userIds);

        for (let user of users) {
            await userRepo.update(user.user_id, user);
        }

        return group_data;

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
