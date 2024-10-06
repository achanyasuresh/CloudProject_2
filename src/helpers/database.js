var AWS = require('aws-sdk');
const { getAwsCreds } = require('./creds');

const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const secret_name = "dev/db/creds";

const client = new SecretsManagerClient({
    region: "us-east-1",
});

let db = null;

const getDb = async function () {

    if (db == null) {
        console.log("initialising db");
        await initialSetup();
    } else {
        console.log("db already initialised");
    }
    return db;
}

const initialSetup = async function () {
    console.log("setting up db creds");

    try {
        // prod stuff
        // const creds = await getAwsCreds();

        const creds = {
        }

        AWS.config.update({
            accessKeyId: creds.db_access_key_id,
            secretAccessKey: creds.db_secret_access_key,
            region: "us-east-1",
        });

        db = new AWS.DynamoDB.DocumentClient({ 
            endpoint: "https://dynamodb.us-east-1.amazonaws.com", 
            convertEmptyValues: true });

    } catch (error) {
        console.log("The db credentials couldn't be accessed! ERROR: " + error);
    }

}

module.exports = {
    getDb,
    initialSetup
};
