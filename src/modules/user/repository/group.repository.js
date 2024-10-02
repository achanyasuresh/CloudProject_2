const {getDb} = require('../../../helpers/database');
const {v4: uuidv4} = require('uuid');

class GroupRepository {

    constructor() {
        this.tableName = "groups";
    }

    async create(data) {
        var db = await getDb();
        const groupUuid = uuidv4();

        const params = {
            TableName: this.tableName,
            Key: {
                group_id: groupUuid
            },
            UpdateExpression: 'SET #group_name = :group_name, #members = :members, #group_files = :group_files',
            ExpressionAttributeNames: {
                "#group_name": "group_name",
                "#members": "members",
                "#group_files": "group_files"
            },
            ExpressionAttributeValues: {
                ":group_name": data.group_name,
                ":members": data.members,
                ":group_files": data.group_files
            },
            ReturnValues: `UPDATED_NEW`
        };

        return db.update(params, function (error, data) {
            if (error) {
                console.log("Couldn't create the group: " + error);
            } else {
                data.Attributes['group_id'] = groupUuid;
            }
        }).promise();
    }

    async findByID(itemId) {

        var db = await getDb();
        var params = {
            TableName: this.tableName,
            KeyConditionExpression: "group_id = :id",
            ExpressionAttributeValues: {
                ":id": itemId
            }
        };
        
        console.log("the params: " + JSON.stringify(params));

        return db.query(params, function (err, data) {
            if (err) {
                console.log(err);
                
            } else {
                console.log("yayy: " + JSON.stringify(data));
            }
         }).promise();
    }

    async update(groupId, data) {

        var db = await getDb();
        const params = {
            TableName: this.tableName,
            Key: {
                group_id: groupId
            },
            UpdateExpression: 'SET #group_name = :group_name, #members = :members, #group_files = :group_files',
            ExpressionAttributeNames: {
                "#group_name": "group_name",
                "#members": "members",
                "#group_files": "group_files"
            },
            ExpressionAttributeValues: {
                ":group_name": data.group_name,
                ":members": data.members,
                ":group_files": data.group_files
            },
            ReturnValues: `UPDATED_NEW`
        };

        return await db.update(params, function (error, data) {
            if (error) {
                console.log("Couldn't update the group: " + error);
            } else {
                console.log("updated the group data successfully string: " + JSON.stringify(data));
            }
        }).promise();
    }

    async deleteByID(UserID) {
        const params = {
            TableName: this.tableName,
            Key: {
                UserID,
            },
        };

        return await db.delete(params).promise();
    }
}

module.exports = GroupRepository;
