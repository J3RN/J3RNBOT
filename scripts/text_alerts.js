// Description:
//   Sends me a text when I am mentioned
//
// Dependencies:
//   twilio
//
// Configuration:
//   TWILIO_AUTHTOKEN
//
// Commands:
//   *J3RN* - Replies respectfully
//
// Author:
//   J3RN

module.exports = (robot) => {
    var client = require('twilio')();

    robot.hear(/(?:^|\s)j3rn(?:\s|\W|$)/i, (msg) => {
        client.messages.create({
            to: process.env.RECIPIENT,
            from: process.env.SENDER,
            body: msg.message.room + "> " + msg.message.user.name + "> " + msg.message.text,
        }, (err, message) => {
            if (err) {
                msg.send(JSON.stringify(err));
            }
        });
    })
}
