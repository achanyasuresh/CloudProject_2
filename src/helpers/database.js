var AWS = require('aws-sdk');

const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const secret_name = "dev/db/creds";

const client = new SecretsManagerClient({
    region: "us-east-1",
});

let secretKey;

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

    const config = { region: "us-east-1" }

    let secretsManager = new AWS.SecretsManager(config);
    try {
        const secretValue = await client.send(new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT",
        }));

        // Process the secretValue
        const creds = JSON.parse(secretValue.SecretString);

        AWS.config.update({
            accessKeyId: creds.db_access_key_id,
            secretAccessKey: creds.db_secret_access_key,
            region: "us-east-1",
            endpoint: "https://dynamodb.us-east-1.amazonaws.com"
        });

        db = new AWS.DynamoDB.DocumentClient({ 
            endpoint: "https://dynamodb.us-east-1.amazonaws.com", 
            convertEmptyValues: true });

    } catch (error) {
        console.log("The db credentials couldn't be accessed! ERROR: " + error);
    }

    // const secret = response.SecretString;

    // console.log("The secrets: " + secret);

}

module.exports = {
    getDb,
    initialSetup
};
