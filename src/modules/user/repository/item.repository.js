const {getDb} = require('../../../helpers/database');
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

        var db = await getDb();
        var params = {
            TableName: this.tableName,
            KeyConditionExpression: "" + this.tableName + "_id = :id",
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

    async findByUserNameAndPassword(email, password) {
        // console.log("The itemId : " + itemId + " and the table: " + this.tableName);
        // const params_old = {
        //     TableName: tableName,
        //     Key: {
        //         itemId,
        //     },
        // };

        var db = await getDb();

        var params = {
            TableName: this.tableName,
            FilterExpression: "email = :email and password = :password",
            ExpressionAttributeValues: {
                ":email": email,
                ":password": password
            }
        };
        // return await db.get(params).promise();

        return db.scan(params, function (err, data) {
            if (err) {
                console.log(err);
                
            } else {
                console.log("yayy: " + JSON.stringify(data));
            }
         }).promise();
    }

    async create_old(data) {

        var db = await getDb();
        console.log("the data: " + JSON.stringify(data) + " and the table: " + this.tableName);

        var item;

        switch (this.tableName) {
            case "users": 
                item = {
                    user_name: data.user_name,
                    email: data.email,
                    password: data.password
                };
                key = {
                    user_id: uuidv4()
                };
                break;
            case "groups":
                item = {
                    group_name: data.group_name
                }
                key = {
                    user_id: uuidv4()
                };
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
            Key: key,
            Item: item,
            ReturnValues: "ALL_NEW",


            UpdateExpression: 'SET #group_name = :group_name, #members = :members',
            ExpressionAttributeNames: {
                "#group_name": "group_name",
                "#members": "members"
            },
            ExpressionAttributeValues: {
                ":group_name": data.group_name,
                ":members": data.members
            },
            ReturnValues: `UPDATED_NEW`
        };

        console.log("The params: " + JSON.stringify(params));


        return db.update(params, function(error, data) {
            if (error) {
                console.log("the error: " + error);
            } else {
                console.log("inserted into db: " + data);
                console.log("inserted into db string: " + JSON.stringify(data));
            }
        }).promise();
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
