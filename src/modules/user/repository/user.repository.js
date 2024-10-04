const { getDb } = require(`../../../helpers/database`);
const { v4: uuidv4 } = require('uuid');

class UserRepository {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async findByID(itemId) {
        console.log("The itemId : " + itemId + " and the table: " + this.tableName);

        var db = await getDb();
        var params = {
            TableName: "users",
            KeyConditionExpression: "user_id = :id",
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

    async findByEmail(userIds) {
        let attributeValues = {};
        let index = 0;

        userIds.forEach(function (value) {
            index += 1;
            var attributeKey = ":email" + index;
            attributeValues[attributeKey.toString()] = value;
        });

        var db = await getDb();
        var params = {
            TableName: "users",
            FilterExpression: 'email in (' + Object.keys(attributeValues).toString() + ')',
            ExpressionAttributeValues: attributeValues
        };

        console.log("the params: " + JSON.stringify(params));

        return db.scan(params, function (err, data) {
            if (err) {
                console.log(err);

            } else {
                console.log("yayy: " + JSON.stringify(data));
            }
        }).promise();
    }

    async create(data) {
        var db = await getDb();

        const userUuid = uuidv4();
        const params = {
            TableName: "users",
            Key: {
                user_id: userUuid
            },
            UpdateExpression: 'SET #user_name = :user_name, #email = :email, #password = :password',
            ExpressionAttributeNames: {
                "#user_name": "user_name",
                "#email": "email",
                "#password": "password"
            },
            ExpressionAttributeValues: {
                ":user_name": data.user_name,
                ":email": data.email,
                ":password": data.password
            },
            ReturnValues: `UPDATED_NEW`
        };

        return await db.update(params, function (error, data) {
            if (error) {
                console.log("Couldn't create the group: " + error);
            } else {
                console.log("created the group data successfully: " + data);
                console.log("created the group data successfully string: " + JSON.stringify(data));
                data.Attributes['user_id'] = userUuid;
            }
        }).promise();
    }

    async update(UserID, data) {

        var db = await getDb();

        if (!data.group_ids) {
            data.group_ids = [];
        }
        const params = {
            TableName: "users",
            Key: {
                UserID: UserID
            },
            UpdateExpression: `set #Username = :Username, #group_ids = :group_ids`,
            ExpressionAttributeNames: {
                '#Username': `user_name`,
                '#group_ids': 'group_ids'
            },
            ExpressionAttributeValues: {
                ":Username": data.user_name,
                ":group_ids": data.group_ids
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

module.exports = new UserRepository();
