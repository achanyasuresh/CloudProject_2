const db = require(`../../../helpers/database`);
const {v4: uuidv4} = require('uuid');

class UserRepository {
    constructor() {
        this.tableName = 'users';
    }

    

    async findByID(UserID) {
        console.log("The userID : " + UserID);
        const params_old = {
            TableName: this.tableName,
            Key: {
                UserID,
            },
        };

        var params = {
            TableName: this.tableName,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": Number(UserID)
            }
        };
        // return await db.get(params).promise();

        return db.query(params, function (err, data) {
            if (err) {
                console.log(err);
                
            } else {
                console.log("yayy: " + JSON.stringify(data));
            }
         }).promise();
    }

    async create(data) {
        console.log("the username: " + JSON.stringify(data));
        const params = {
            TableName: this.tableName,
            Item: {
                id: Math.floor(Math.random() * 100000),
                UserID: uuidv4(),
                Username: data.Username,
            },
        };

        console.log("The params: " + JSON.stringify(params));

        db.put(params, function(error, data) {
            if (error) {
                console.log("the error: " + error);
            } else {
                console.log("yayy: " + JSON.stringify(data));
            }
        })

        await db.put(params).promise();

        return params.Item;
    }

    async update(UserID, data) {
        const params = {
            TableName: this.tableName,
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
