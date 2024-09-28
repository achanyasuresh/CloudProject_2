const NotificationService = require("../service/notification.service");

const notificationService = new NotificationService();

class NotificationController {


    async sendNotification(request, response) {

        await notificationService.sendNotification(request.data);

        response.status(200)
            .json({
                "message": "The notifications have been successfully sent"
            });
    }

    async subscribeToTopic(request, response) {

        await notificationService.subscribeToTopic(request.query.email);

        response.status(200)
            .json({
                "message": "The email has been subscribed to the SNS topic"
            })
    }
}

module.exports = NotificationController