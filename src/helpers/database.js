var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "AKIAQGYBPP5N6LNVQWE6",
    secretAccessKey: "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",
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

module.exports = db;
