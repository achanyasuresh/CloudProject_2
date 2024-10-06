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
        var group_id = group_data.group_id;

        var members = group_data.members;

        var userIds = members.map((user, index) => {
            return user.email
        });

        var users = await userRepo.findByEmail(userIds);

        console.log("the users found with the email: " + users);
        console.log("the users found with the email: " + JSON.stringify(users));

        for (let user of users.Items) {
            console.log("the user info: " + user);
            console.log("The user info string: " + JSON.stringify(user));
            if (!user.group_ids) {
                user.group_ids = [group_id];
            } else {
                user.group_ids.push(group_id);
            }

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

    async updateMembers(groupId, members) {
        console.log("in service");
        var group_data = await groupRepo.findByID(groupId)
            .then((items) => {
                return items.Items;
            });

        if (!members) {
            members = [];
        }

        group_data[0]['members'].push(members);

        console.log("the final group data: " + JSON.stringify(group_data));

        return await groupRepo.update(groupId, group_data[0]);
    }

    async uploadFileSubmission(groupId, file_name, file_stream) {
        return await groupRepo.uploadToS3(groupId, file_name, file_stream);
        // var file_data = await groupRepo.uploadToS3(groupId, file_name, file_stream);
        // var file = {
        //     "file_path": 
        // }
        // var group_data = await groupRepo.findByID(groupId)
        //     .then(items => items.Items);

        // if (!group_data['group_files']) {
            
        // }

    }

    async deleteByID(UserID) {
        return await itemRepository.deleteByID(UserID);
    }

}

module.exports = GroupService;
