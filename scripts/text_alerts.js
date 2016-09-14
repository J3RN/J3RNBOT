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
    var context = {};

    const enqueueMessage = (msg) => {
	const room = msg.message.room;
	const text = msg.message.text;
	const user = msg.message.user.name;

	if (!Object.keys(context).includes(room)) {
	    context[room] = [];
	}

	context[room].push([user, text]);
	if (context[room].length > 5) {
	    context[room].shift();
	}
    }

    robot.hear(/.*/, (msg) => {
	enqueueMessage(msg);

	if (msg.message.match(/(?:^|\s)j3rn(?:\s|\W|$)/i)) {
	    const room = msg.message.room;
	    const message = context[room].reduce((acc, x) => {
		return acc + "\n" + x[0] + ": " + x[1];
	    }, "");

            client.messages.create({
		to: process.env.RECIPIENT,
		from: process.env.SENDER,
		body: "<" + room + ">" + message
            }, (err, message) => {
		if (err) {
                    msg.send(JSON.stringify(err));
		}
            });
	}
    });
}
