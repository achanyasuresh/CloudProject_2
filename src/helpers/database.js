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

const getDb = function() {
    return db;
}

let db = null;
const initialSetup = async function () {
    console.log("setting up db creds");

    // try {
    //     response = await client.send(
    //         new GetSecretValueCommand({
    //             SecretId: secret_name,
    //             VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    //         })
    //     ).then(response => {
    //         console.log("the response string: " + response.SecretString);
    //         secretKey = response.SecretString;
    //     });
    // } catch (error) {
    //     console.log("The db credentials couldn't be accessed! ERROR: " + error);
    //     throw error;
    // }

    const config = { region: "us-east-1" }

    let secretsManager = new AWS.SecretsManager(config);
    // console.log("the manager: " + JSON.stringify(secretsManager));
    try {
        let secretValue = secretsManager
            .getSecretValue({ SecretId: secret_name })
            .promise()
            .then(response => {
                console.log("finished the request");
                console.log("The response: " + response);
                console.log("the response json: " + JSON.stringify(response));

                var creds = JSON.parse(response.SecretString);

                console.log("The db creds: " + creds);
                console.log("The db creds string: " + JSON.stringify(creds));

                AWS.config.update({

                    accessKeyId: creds.db_access_key_id,
                    secretAccessKey: creds.db_secret_access_key,
                    region: "us-east-1",
                    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
                });

                db = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });

                console.log("The db object in the setup phase: " + db);
                console.log("The db object in the setup phase string: " + JSON.stringify(db));
            })
            .then(() => {
                console.log("the db after then: " + JSON.stringify(db));
            });

        // if ('SecretString' in secretValue) {
        //     return secret = secretValue.SecretString;
        // } else {
        //     let buff = new Buffer(secretValue.SecretBinary, 'base64');
        //     return decodedBinarySecret = buff.toString('ascii');
        // }
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
