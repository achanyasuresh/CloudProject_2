var AWS = require('aws-sdk');
const { S3Client } = require("@aws-sdk/client-s3");
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
let s3 = null;

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
            // endpoint: "https://dynamodb.us-east-1.amazonaws.com"
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


const getS3 = async function () {

    if (s3 == null) {
        console.log("initialising S3");
        await initialSetupS3();
    } else {
        console.log("S3 already initialised");
    }
    return s3;
}

const initialSetupS3 = async function () {
    console.log("setting up db creds");

    try {
        // prod stuff
        const creds = await getAwsCreds();

        // const creds = {
        // }

        AWS.config.update({
            accessKeyId: creds.db_access_key_id,
            secretAccessKey: creds.db_secret_access_key,
            region: "us-east-1"
        });

        s3 = new S3Client({
            accessKeyId: creds.db_access_key_id,
            secretAccessKey: creds.db_secret_access_key,
            region: "us-east-1"
        });

    } catch (error) {
        console.log("The s3 credentials couldn't be accessed! ERROR: " + error);
    }

}

module.exports = {
    getDb,
    initialSetup,
    getS3
};