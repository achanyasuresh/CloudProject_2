const {
    SecretsManagerClient,
    GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const secret_name = "dev/jwt/creds";

const client = new SecretsManagerClient({
    region: "us-east-1",
});

var creds = null;

const getJwtCreds = async function() {

    if (creds == null) {
        await initialSetup();
    } 

    return creds.JWT_SECRET_KEY;
}

const initialSetup = async function () {

    try {
        const secretValue = await client.send(new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT",
        }));

        creds = JSON.parse(secretValue.SecretString);

    } catch (error) {
        console.log("The secret manager data couldn't be accessed! ERROR: " + error);
    }
}

module.exports = {
    getJwtCreds,
    initialSetup
}