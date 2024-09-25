var AWS = require('aws-sdk');

AWS.config.update({

    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

module.exports = db;
