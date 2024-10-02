const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const jwt_secret_name = "dev/jwt/creds";
const aws_secret_name = "dev/db/creds"

const client = new SecretsManagerClient({
    region: "us-east-1",
});

var creds = null;

const getJwtCreds = async function() {

    if (creds == null) {
        await jwtInitialSetup();
    } 

    console.log("the jwt creds: " + JSON.stringify(creds));

    return creds.JWT_SECRET_KEY;
}

const getAwsCreds = async function() {

    if (creds == null) {
        await awsInitialSetup();
    } 

    return creds;
}

const jwtInitialSetup = async function () {

    try {
        const secretValue = await client.send(new GetSecretValueCommand({
            SecretId: jwt_secret_name,
            VersionStage: "AWSCURRENT",
        }));

        creds = JSON.parse(secretValue.SecretString);

    } catch (error) {
        console.log("The secret manager data couldn't be accessed! ERROR: " + error);
    }
}

const awsInitialSetup = async function () {

    try {
        const secretValue = await client.send(new GetSecretValueCommand({
            SecretId: aws_secret_name
        ,
            VersionStage: "AWSCURRENT",
        }));

        creds = JSON.parse(secretValue.SecretString);

    } catch (error) {
        console.log("The secret manager data couldn't be accessed! ERROR: " + error);
    }
}

module.exports = {
    getJwtCreds,
    getAwsCreds
}