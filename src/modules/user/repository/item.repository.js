const db = require(`../../../helpers/database`);
const {v4: uuidv4} = require('uuid');

class ItemRepository {

    constructor(tableName) {
        this.tableName = tableName;
    }

    async findByID(itemId) {
        console.log("The itemId : " + itemId + " and the table: " + this.tableName);
        // const params_old = {
        //     TableName: tableName,
        //     Key: {
        //         itemId,
        //     },
        // };

        var params = {
            TableName: this.tableName,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": Number(itemId)
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
        console.log("the data: " + JSON.stringify(data) + " and the table: " + this.tableName);

        var item;

        switch (this.tableName) {
            case "users": 
                item = {
                    id: Math.floor(Math.random() * 100000),
                    UserID: uuidv4(),
                    userName: data.userName,
                    email: data.email,
                    password: data.password
                }
                break;
            case "group":
                item = {
                    id: Math.floor(Math.random() * 100000),
                    groupName: data.groupName
                }
                break;
            case "event":
                item = {
                    id: Math.floor(Math.random() * 100000),
                    eventName: data.eventName,
                    description: data.description,
                    date: data.date
                }
                break;
            case "ctf": 
                item = {
                    id: Math.floor(Math.random() * 100000),
                    ctfName: data.ctfName,
                    date: data.date,
                    problem: data.problem
                }
        }

        const params = {
            TableName: this.tableName,
            Item: item,
        };

        console.log("The params: " + JSON.stringify(params));

        db.put(params, function(error, data) {
            if (error) {
                console.log("the error: " + error);
            } else {
                console.log("yayy: " + JSON.stringify(data));
            }
        })

        return db.put(params).promise();
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

module.exports = ItemRepository;
