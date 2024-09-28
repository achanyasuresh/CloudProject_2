const { getAwsCreds } = require('../../../helpers/creds');
const { utilConstants } = require('../../../helpers/constants');

class NotificationService {

    async sendNotification(data) {
        const creds = await getAwsCreds();

        const AWS = require("aws-sdk");

        AWS.config.update({
            accessKeyId: creds.db_access_key_id,
            secretAccessKey: creds.db_secret_access_key,
            region: "us-east-1"
        });

        // Create publish parameters
        var params = {
            Subject: data.subject,
            Message: data.message,
            TopicArn: utilConstants.SNS_TOPIC_ARN
        };

        // Create promise and SNS service object
        var publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
            .publish(params)
            .promise();

        // Handle promise's fulfilled/rejected states
        publishTextPromise
            .then(function (data) {
                console.log(
                    `Message ${params.Message} sent to the topic ${params.TopicArn}`
                );
                console.log("MessageID is " + data.MessageId);
                console.log("the full data returned from the sns sdk: " + JSON.stringify(data));
            })
            .catch(function (err) {
                console.error(err, err.stack);
            });
    }

    async subscribeToTopic(email) {

        console.log("setting up the sns creds");
        const creds = await getAwsCreds();

        const AWS = require("aws-sdk");
        
        AWS.config.update({
            accessKeyId: creds.db_access_key_id,
            secretAccessKey: creds.db_secret_access_key,
            region: "us-east-1"
        });

        var params = {
            Protocol: utilConstants.SNS_SUBSCRIPTION_PROTOCOL,
            TopicArn: utilConstants.SNS_TOPIC_ARN,
            Endpoint: email,
        };

        console.log('subscribing to the topic with params ' + JSON.stringify(params));
        console.log("the aws object: " + JSON.stringify(AWS.config));

        var sns = new AWS.SNS({ apiVersion: "2010-03-31" })
        .subscribe(params)
        .promise();
        console.log("created the sns object");

        sns.then((data) => {
                    console.log(data);
                }
            )
            .catch((error) => {
                console.log("The email couldn't be subscribed to the topic: " + error);
            });
    }

}

module.exports = NotificationService;
