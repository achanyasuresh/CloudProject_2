const { getDb, getS3 } = require('../../../helpers/database');
const { v4: uuidv4 } = require('uuid');
const { utilConstants } = require('../../../helpers/constants');

const { PutObjectCommand } = require("@aws-sdk/client-s3");

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
                console.log("group: " + JSON.stringify(data));
            }
        }).promise();
    }

    async update(groupId, data) {

        console.log("the updating value: " + JSON.stringify(data));

        var db = await getDb();

        var set_expression = 'SET #group_name = :group_name, #members = :members';
        var expression_names = {
            "#group_name": "group_name",
            "#members": "members"
        };
        var expression_values = {
            ":group_name": data.group_name,
            ":members": data.members
        }
        if (data.group_files) {
            set_expression += ', #group_files = :group_files';
            expression_names["#group_files"] = "group_files";
            expression_values[":group_files"] = data.group_files;
        }
        const params = {
            TableName: this.tableName,
            Key: {
                group_id: groupId
            },
            UpdateExpression: set_expression,
            ExpressionAttributeNames: expression_names,
            ExpressionAttributeValues: expression_values,
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

    async updateMembers(groupId, members) {

        console.log("in repo");
        if (!members) {
            members = [];
        }

        var db = await getDb();
        const params = {
            TableName: this.tableName,
            Key: {
                group_id: groupId
            },
            UpdateExpression: 'SET #members = list_append(#members, :members)',
            ExpressionAttributeNames: {
                "#members": "members",
            },
            ExpressionAttributeValues: {
                ":members": members,
            },
            ReturnValues: `UPDATED_NEW`
        };

        console.log("the params for members: " + JSON.stringify(params));

        var response = await db.update(params, function (error, data) {
            if (error) {
                console.log("Couldn't update the group: " + error);
            } else {
                console.log("updated the group member data successfully string: " + JSON.stringify(data));
            }
        }).promise();

        return response;
    }

    async uploadToS3(group_id, file_name, file_stream, file_type) {

        var s3 = await getS3();

        const input = {
            Bucket: utilConstants.S3_BUCKET_NAME,
            Key: group_id + "/" + file_name,
            Body: file_stream,
            ContentType: file_type
        }

        const params = new PutObjectCommand(input);

        return await s3.send(params);
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
