const {getDb} = require('../../../helpers/database');
const {v4: uuidv4} = require('uuid');

class GroupRepository {

    constructor() {
        this.tableName = "groups";
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
            UpdateExpression: 'set group_name = :group_name, members = :members',
            ExpressionAttributeValues: {
                ":group_name": data.groupName,
                ":members": data.members
            },
            ReturnValues: `UPDATED_NEW`,
        };

        const update = await db.update(params).promise();

        return update.Attributes;
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
