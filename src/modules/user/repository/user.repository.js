const {getDb} = require(`../../../helpers/database`);
const {v4: uuidv4} = require('uuid');

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
        const params = {
            TableName: "users",
            Key: {
                UserID: UserID
            },
            UpdateExpression: `set #Username = :Username`,
            ExpressionAttributeNames: {
                '#Username': `Username`,
            },
            ExpressionAttributeValues: {
                ":Username": data.Username,
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
