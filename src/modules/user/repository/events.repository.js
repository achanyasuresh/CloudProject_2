const {getDb} = require('../../../helpers/database');
const {v4: uuidv4} = require('uuid');

class EventsRepository {

    constructor() {
        this.tableName = "events";

    }

    async create(data) {
        var db = await getDb();
        const eventUuid = uuidv4();

        const params = {
            TableName: this.tableName,
            Key: {
                event_id: eventUuid
            },
            UpdateExpression: 'SET #event_name = :event_name, #members = :members',
            ExpressionAttributeNames: {
                "#event_name": "event_name",
                "#members": "members"
            },
            ExpressionAttributeValues: {
                ":event_name": data.event_name,
                ":members": data.members
            },
            ReturnValues: `UPDATED_NEW`
        };

        return db.update(params, function (error, data) {
            if (error) {
                console.log("Couldn't create the group: " + error);
            } else {
                data.Attributes['event_id'] = eventUuid;
            }
        }).promise();
    }

    async findByID(itemId) {

        var db = await getDb();
        var params = {
            TableName: this.tableName,
            KeyConditionExpression: "event_id = :id",
            ExpressionAttributeValues: {
                ":id": itemId
            }
        };
        
        console.log("the params: " + JSON.stringify(params));

        return db.query(params, function (err, data) {
            if (err) {
                console.log(err);
                
            } else {
                console.log("event: " + JSON.stringify(data));
            }
         }).promise();
    }

    async findAll() {

        var db = await getDb();
        var params = {
            TableName: this.tableName
        };
        
        return db.scan(params, function (err, data) {
            if (err) {
                console.log(err);
                
            } else {
                if (typeof data.LastEvaluatedKey != "undefined") {
                    console.log("there are more entries in the db");
                }
            }
         }).promise();
    }

    async update(eventId, data) {

        var db = await getDb();
        const params = {
            TableName: this.tableName,
            Key: {
                event_id: eventId
            },
            UpdateExpression: 'SET #event_name = :event_name, #members = :members',
            ExpressionAttributeNames: {
                "#event_name": "event_name",
                "#members": "members"
            },
            ExpressionAttributeValues: {
                ":event_name": data.event_name,
                ":members": data.members
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

module.exports = EventsRepository;
