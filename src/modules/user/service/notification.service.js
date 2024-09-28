const { getAwsCreds } = require('../../../helpers/creds');
const { utilConstants } = require('../../../helpers/constants');

const AWS = require("aws-sdk");


class NotificationService {

    async sendNotification(data) {
        const creds = await getAwsCreds();

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
        
        AWS.config.update({
            accessKeyId: creds.db_access_key_id,
            secretAccessKey: creds.db_secret_access_key,
            region: "us-east-1"
        });

        var params = {
            Protocol: utilConstants.SNS_SUBSCRIPTION_PROTOCOL,
            TopicArn: utilConstants.SNS_TOPIC_ARN,
            // Attributes: {
            //   '<attributeName>': 'STRING_VALUE',
            //   /* '<attributeName>': ... */
            // },
            Endpoint: email,
            ReturnSubscriptionArn: true
        };

        console.log('subscribing to the topic');

        var sns = await new AWS.SNS({ apiVersion: "2010-03-31" });
            
        sns.subscribe(params, function (err, data) {
                if (err) {
                    console.log("We couldn't subscribe to the topic: " + error);
                    // console.log(err, err.stack);
                }
                else {
                    console.log(data);
                }
            })
            .promise();
    }

}

module.exports = NotificationService;
